DROP PROCEDURE IF EXISTS sp_delete_player_match;
DELIMITER //

CREATE PROCEDURE sp_delete_player_match(
    IN p_player_match_id INT
)
BEGIN
    DELETE FROM player_matches
    WHERE player_match_id = p_player_match_id;
END //
DELIMITER ;