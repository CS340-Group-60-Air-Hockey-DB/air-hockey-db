DROP TRIGGER IF EXISTS trg_set_revert_to_scheduled;
DELIMITER //

CREATE TRIGGER trg_set_revert_to_scheduled
BEFORE UPDATE ON `sets`
FOR EACH ROW
BEGIN
    IF NEW.set_status = 'scheduled' AND OLD.set_status != 'scheduled' THEN
        SET NEW.winner_id = NULL,
            NEW.start_datetime = NULL,
            NEW.end_datetime = NULL;
    END IF;
END //
DELIMITER ;