-- Winner id will be a trigger and should not be inserted
DROP PROCEDURE IF EXISTS sp_update_match;
DELIMITER //

CREATE PROCEDURE sp_update_match(
    IN m_match_id int(11),
    IN m_set_max tinyint(4),
    IN m_faceoff_type enum('standard', 'puck flip'),
    IN m_start_datetime datetime,
    IN m_end_datetime datetime,
    IN l_location_id int(11),
    IN m_match_type enum('challenge', 'tournament', 'league', 'other'),
    IN m_note varchar(10000),
    IN m_match_status enum('scheduled', 'in_progress', 'completed', 'abandoned'),
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

        -- Validate enum inputs
        IF m_match_type IS NOT NULL AND m_match_type NOT IN ('challenge', 'tournament', 'league', 'other') THEN
            SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'Invalid match_type value. Value must be one of: challenge, tournament, league, other';
        END IF;

        IF m_match_status IS NOT NULL AND m_match_status NOT IN ('scheduled', 'in_progress', 'completed', 'abandoned') THEN
            SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'Invalid match_status value. Value must be one of: scheduled, in_progress, completed, abandoned';
        END IF;

        IF m_faceoff_type IS NOT NULL AND m_faceoff_type NOT IN ('standard', 'puck flip') THEN
            SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'Invalid faceoff_type value. Value must be one of: standard, puck_flip';
        END IF;

        UPDATE matches
        SET
        -- Not nullable fields; will result the current data as the default value
            set_max = COALESCE(m_set_max, set_max),
            faceoff_type = COALESCE(m_faceoff_type, faceoff_type),
            start_datetime = COALESCE(m_start_datetime, start_datetime),
            location_id = COALESCE(l_location_id, location_id),
            match_type = COALESCE(m_match_type, match_type),
            match_status = COALESCE(m_match_status, match_status),
        -- Nullable fields: NULL input clears the field
            end_datetime = m_end_datetime,
            note = NULLIF(m_note, ''),
        -- Change winner_id to null if match status changes from 'completed'
            winner_id = CASE
                            WHEN m_match_status != 'completed' THEN null
                            ELSE winner_id
                        END
        WHERE match_id = m_match_id;

        SET rows_affected = ROW_COUNT();
    COMMIT;
END //
DELIMITER ;