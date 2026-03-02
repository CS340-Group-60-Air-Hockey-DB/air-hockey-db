----- DELETE -----
DROP PROCEDURE IF EXISTS sp_delete_match;
DELIMITER //

CREATE PROCEDURE sp_delete_match(
    IN m_match_id int(11),
    OUT rows_affected int(11),
    OUT error_message varchar(255)
)
BEGIN
    DECLARE match_exists boolean;

-- In case of an error, set the rows_affected to -99
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET rows_affected = -99;
            GET DIAGNOSTICS CONDITION 1
                error_message = MESSAGE_TEXT;
            ROLLBACK;
        END;

    START TRANSACTION;
    -- Validate match with id exists
        SELECT COUNT(*) INTO match_exists 
            FROM matches 
        WHERE match_id = m_match_id;
        
        IF match_exists = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Match not found';
        END IF;

        DELETE FROM matches
        WHERE match_id = m_match_id;

        SET rows_affected = ROW_COUNT();
    COMMIT;
END //
DELIMITER ;