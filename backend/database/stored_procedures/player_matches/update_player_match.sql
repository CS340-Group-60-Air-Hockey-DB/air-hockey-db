DROP PROCEDURE IF EXISTS sp_update_player_match;
DELIMITER//

CREATE PROCEDURE sp_update_player_match(
    IN p_player_id INT,
    IN p_match_id INT,
    IN p_starting_side ENUM('left', 'right'),
    IN p_player_order ENUM('player_1', 'player_2'),
    IN p_player_match_id INT
)
BEGIN
    UPDATE player_matches SET
        player_id = p_player_id,
        match_id = p_match_id,
        starting_side = p_starting_side,
        player_order = p_player_order
    WHERE player_match_id = p_player_match_id;
END //
DELIMITER ;