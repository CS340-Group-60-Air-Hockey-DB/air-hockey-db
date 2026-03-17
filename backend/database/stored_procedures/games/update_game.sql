DROP PROCEDURE IF EXISTS sp_update_game;
DELIMITER //

CREATE PROCEDURE sp_update_game(
    IN p_game_id INT(11),
    IN p_set_id INT(11),
    IN p_game_num TINYINT(4),
    IN p_player_1_score TINYINT(4),
    IN p_player_2_score TINYINT(4),
    IN p_game_status ENUM('scheduled', 'in_progress', 'completed', 'abandoned'),
    IN p_start_datetime DATETIME,
    IN p_end_datetime DATETIME,

    OUT p_out_game_id INT(11),
    OUT p_error_message VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET p_out_game_id = -99;
            SET p_error_message = NULL;

            GET DIAGNOSTICS CONDITION 1
                p_error_message = MESSAGE_TEXT;
            ROLLBACK;
        END;

    START TRANSACTION;

    -- Validation:
        -- game_id exists in the DB
        IF p_game_id IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'game_id must be provided.';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM games WHERE game_id = p_game_id) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'game_id does not reference an existing game.';
        END IF;

        -- set_id exists in the DB
        IF p_set_id IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'set_id must be provided.';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM `sets` WHERE set_id = p_set_id) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'set_id does not reference an existing set.';
        END IF;

    -- game_num is between 1 + 7
        IF p_game_num IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'game_num must be provided.';
        END IF;

        IF p_game_num NOT BETWEEN 1 AND 7 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'game_num must be between 1 and 7.';
        END IF;

        -- Duplicate game_num check within the same set, excluding the current game
        IF EXISTS (
            SELECT 1 FROM games
            WHERE set_id = p_set_id
                AND game_num = p_game_num
                AND game_id != p_game_id
        ) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'A game with the given game number already exists in this set.';
        END IF;

        -- Scores are between 0 + 7
        IF COALESCE(p_player_1_score, 0) NOT BETWEEN 0 AND 7 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'player_1_score must be between 0 and 7.';
        END IF;

        IF COALESCE(p_player_2_score, 0) NOT BETWEEN 0 AND 7 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'player_2_score must be between 0 and 7.';
        END IF;

        -- Completed game condition check
        IF COALESCE(p_game_status, 'scheduled') = 'completed' THEN
            IF NOT (
                (COALESCE(p_player_1_score, 0) = 7 AND COALESCE(p_player_2_score, 0) < 7) OR
                (COALESCE(p_player_2_score, 0) = 7 AND COALESCE(p_player_1_score, 0) < 7)
            ) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'A completed game must have exactly one player at 7 points.';
            END IF;
        END IF;

        -- Datetime Values
        IF p_end_datetime IS NOT NULL AND p_start_datetime IS NOT NULL 
            AND p_end_datetime <= p_start_datetime THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'end_datetime must be after start_datetime.';
        END IF;

        IF p_end_datetime IS NOT NULL AND p_start_datetime IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'start_datetime must be provided, the end_datetime cannot be set without it.';
        END IF;

    -- Update
        UPDATE games SET
            set_id          = p_set_id,
            game_num        = p_game_num,
            player_1_score  = COALESCE(p_player_1_score, 0),
            player_2_score  = COALESCE(p_player_2_score, 0),
            game_status     = COALESCE(p_game_status, 'scheduled'),
            start_datetime  = p_start_datetime,
            end_datetime    = p_end_datetime
        WHERE game_id = p_game_id;

        SET p_out_game_id = p_game_id;

    COMMIT;
END //
DELIMITER ;