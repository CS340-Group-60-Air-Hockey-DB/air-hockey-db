DROP PROCEDURE IF EXISTS sp_delete_match_official;
DELIMITER //

CREATE PROCEDURE sp_delete_match_official(
    IN p_match_official_id INT
)
BEGIN
    DELETE FROM match_officials
    WHERE match_official_id = p_match_official_id;
END //
DELIMITER ;