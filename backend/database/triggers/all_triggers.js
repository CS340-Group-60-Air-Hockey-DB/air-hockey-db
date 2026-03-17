const all_triggers = `
    CREATE TRIGGER trg_abandon_match
    AFTER UPDATE ON matches
    FOR EACH ROW        
    BEGIN
        IF NEW.match_status = 'abandoned' AND OLD.match_status != 'abandoned' THEN
            UPDATE sets
                SET set_status = 'abandoned'
            WHERE match_id = NEW.match_id AND set_status != 'abandoned';

            UPDATE games g
                JOIN sets s ON g.set_id = s.set_id
                SET g.game_status = 'abandoned'
            WHERE s.match_id = NEW.match_id
                AND g.game_status != 'abandoned';
        END IF;
    END;

    CREATE TRIGGER trg_match_revert_to_scheduled
    BEFORE UPDATE ON matches
    FOR EACH ROW
    BEGIN
        IF NEW.match_status = 'scheduled' AND OLD.match_status != 'scheduled' THEN
            SET NEW.winner_id = NULL, 
                NEW.end_datetime = NULL;

            DELETE FROM sets
            WHERE match_id = OLD.match_id;
        END IF;
    END;

    CREATE TRIGGER trg_set_revert_to_scheduled
    BEFORE UPDATE ON sets
    FOR EACH ROW
    BEGIN
        IF NEW.set_status = 'scheduled' AND OLD.set_status != 'scheduled' THEN
            SET NEW.winner_id = NULL,
                NEW.start_datetime = NULL,
                NEW.end_datetime = NULL;
        END IF;
    END;

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
    END;
`

module.exports = all_triggers