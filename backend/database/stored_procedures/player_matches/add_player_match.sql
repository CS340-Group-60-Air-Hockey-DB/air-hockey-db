DROP PROCEDURE IF EXISTS sp_add_player_match;
DELIMITER //

CREATE PROCEDURE sp_add_player_match(
    IN p_player_id INT,
    IN p_match_id INT,
    IN p_starting_side ENUM('left', 'right'),
    IN p_player_order ENUM('player_1', 'player_2')
)
BEGIN
    INSERT INTO player_matches (player_id, match_id, starting_side, player_order)
    VALUES (p_player_id, p_match_id, p_starting_side, p_player_order);

    -- Return new ID back to player_matches.js
    SELECT LAST_INSERT_ID() AS insertId;
END //
DELIMITER ;