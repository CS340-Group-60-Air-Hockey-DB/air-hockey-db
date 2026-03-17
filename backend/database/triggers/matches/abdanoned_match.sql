DROP TRIGGER IF EXISTS trg_abandon_match;
DELIMITER //

CREATE TRIGGER trg_abandon_match
AFTER UPDATE ON matches
FOR EACH ROW
BEGIN
    IF NEW.match_status = 'abandoned' AND OLD.match_status != 'abandoned' THEN
    -- Change all sets + games statuses to abandoned
        UPDATE sets
            SET set_status = 'abandoned'
        WHERE match_id = NEW.match_id AND set_status != 'abandoned';

        UPDATE games g
            JOIN sets s ON g.set_id = s.set_id
            SET g.game_status = 'abandoned'
        WHERE s.match_id = NEW.match_id
            AND g.game_status != 'abandoned';
    END IF;
END //
DELIMITER ;