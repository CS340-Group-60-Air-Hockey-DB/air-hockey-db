DROP PROCEDURE IF EXISTS sp_add_match;
DELIMITER //

CREATE PROCEDURE sp_add_match(
    IN m_set_max tinyint(4),
    IN m_faceoff_type enum('standard', 'puck flip'),
    IN m_start_datetime datetime,
    IN m_end_datetime datetime,
    IN l_location_id int(11),
    IN m_match_type enum('challenge', 'tournament', 'league', 'other'),
    IN m_note varchar(10000),
    IN m_match_status enum('scheduled', 'in_progress', 'completed', 'abandoned'),
    OUT match_id int(11)
)
BEGIN
-- In case of an error, set the match_id to -99
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET match_id = -99;
            ROLLBACK;
        END;

    START TRANSACTION;
        -- Insert Values
        -- COALESCE makes the default value of the attribute if an enum is null
        -- NULLIF on m_note inserts null if the m_note string is empty
            INSERT INTO matches(set_max, faceoff_type, start_datetime, end_datetime, location_id, match_type, note, match_status)
            VALUES (COALESCE(m_set_max, 3), COALESCE(m_faceoff_type, 'standard'), m_start_datetime, m_end_datetime, l_location_id, m_match_type, NULLIF(m_note, ''), COALESCE(m_match_status, 'scheduled'));

        -- Get the last inserted id 
            SET match_id = LAST_INSERT_ID();
    COMMIT;
END //
DELIMITER ;