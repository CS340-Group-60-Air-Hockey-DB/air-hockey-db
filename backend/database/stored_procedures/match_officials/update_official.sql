DROP PROCEDURE IF EXISTS sp_update_match_official;
DELIMITER //

CREATE PROCEDURE sp_update_match_official(
    IN p_official_person_id INT,
    IN p_set_id INT,
    IN p_official_type ENUM('referee', 'witness'),
    IN p_match_official_id INT
)
BEGIN
    UPDATE match_officials SET
        official_person_id = p_official_person_id,
        set_id = p_set_id,
        official_type = p_official_type
    WHERE match_official_id = p_match_official_id;
END //
DELIMITER ;