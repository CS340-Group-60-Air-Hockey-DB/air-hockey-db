DROP PROCEDURE IF EXISTS sp_add_match_official;
DELIMITER //

CREATE PROCEDURE sp_add_match_official (
    IN p_official_person_id INT,
    IN p_set_id INT,
    IN p_official_type ENUM('referee', 'witness')
)
BEGIN
    INSERT INTO match_officials (official_person_id, set_id, official_type)
    VALUES (p_official_person_id, p_set_id, p_official_type);
    -- return new ID back to match_officials.js
    SELECT LAST_INSERT_ID() AS insertId;
END //
DELIMITER ;