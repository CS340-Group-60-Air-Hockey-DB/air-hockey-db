DROP PROCEDURE IF EXISTS sp_add_player_match;
DELIMITER //

CREATE PROCEDURE sp_add_player_match(
    IN p_player_id INT,
    IN p_match_id INT,
    IN p_starting_side ENUM('left', 'right'),
    IN p_player_order ENUM('player_1', 'player_2')
)
BEGIN
    DECLARE v_total_players INT;
    DECLARE v_slot_taken INT;
    DECLARE v_player_exists INT;

    -- check if match is full
    SELECT COUNT(*) INTO v_total_players
    FROM player_matches
    WHERE match_id = p_match_id;

    IF v_total_players >= 2 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Database Error: This match already has the maximum of 2 players.';
    END IF;

    -- check if slot is already taken
    SELECT COUNT(*) INTO v_slot_taken
    FROM player_matches
    WHERE match_id = p_match_id
        AND (starting_side = p_starting_side OR player_order = p_player_order);
    
    IF v_slot_taken > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Database Error: That starting side and/or player order is already taken.';
    END IF;

    -- check if player is already in this match
    SELECT COUNT(*) INTO v_player_exists
    FROM player_matches
    WHERE match_id = p_match_id
        AND player_id = p_player_id;
    
    IF v_player_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Database Error: This player is already assigned to this match.';
    END IF;

    INSERT INTO player_matches (player_id, match_id, starting_side, player_order)
    VALUES (p_player_id, p_match_id, p_starting_side, p_player_order);

    -- Return new ID back to player_matches.js
    SELECT LAST_INSERT_ID() AS insertId;
END //
DELIMITER ;