DROP PROCEDURE IF EXISTS sp_update_match_official;
DELIMITER //

CREATE PROCEDURE sp_update_match_official(
    IN p_official_person_id INT,
    IN p_set_id INT,
    IN p_official_type ENUM('referee', 'witness'),
    IN p_match_official_id INT,

    OUT p_error_message VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET p_error_message = NULL;
            GET DIAGNOSTICS CONDITION 1
                p_error_message = MESSAGE_TEXT;
            ROLLBACK;
        END;

    START TRANSACTION;

    -- Only check for duplicate referee, witnesses have no limit
    IF p_official_type = 'referee' THEN
        IF EXISTS (
            SELECT 1 FROM match_officials
            WHERE set_id = p_set_id
                AND official_type = 'referee'
                AND match_official_id != p_match_official_id
        ) THEN
            SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = 'A referee is already assigned to this set.';
        END IF;
    END IF;

    UPDATE match_officials SET
        official_person_id = p_official_person_id,
        set_id = p_set_id,
        official_type = p_official_type
    WHERE match_official_id = p_match_official_id;

    COMMIT;
END //
DELIMITER ;