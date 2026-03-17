DROP TRIGGER IF EXISTS trg_match_revert_to_scheduled;
DELIMITER //

CREATE TRIGGER trg_match_revert_to_scheduled
AFTER UPDATE ON matches
FOR EACH ROW
BEGIN
    IF NEW.match_status = 'scheduled' AND OLD.match_status != 'scheduled' THEN
        UPDATE matches
            SET winner_id = NULL,
                end_datetime = NULL
        WHERE match_id = NEW.match_id;

        -- Games are cascade on delete from sets
        DELETE FROM sets
            WHERE match_id = OLD.match_id;
    END IF;
END //
DELIMITER ;