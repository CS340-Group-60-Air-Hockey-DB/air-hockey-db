DROP TRIGGER IF EXISTS trg_game_revert_to_scheduled;
DELIMITER //

CREATE TRIGGER trg_game_revert_to_scheduled
BEFORE UPDATE ON games
FOR EACH ROW
BEGIN
    IF NEW.game_status = 'scheduled' AND OLD.game_status != 'scheduled' THEN
        SET NEW.player_1_score = 0,
            NEW.player_2_score = 0,
            NEW.start_datetime = NULL,
            NEW.end_datetime = NULL;
    END IF;
END //
DELIMITER ;