DROP PROCEDURE IF EXISTS sp_delete_game;
DELIMITER //

CREATE PROCEDURE sp_delete_game(
    IN g_game_id int(11),

    OUT rows_affected int(11),
    OUT error_message varchar(255)
)
BEGIN
    DECLARE game_exists boolean;

-- In case of an error, set the rows_affected to -99
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET rows_affected = -99;
            GET DIAGNOSTICS CONDITION 1
                error_message = MESSAGE_TEXT;
            ROLLBACK;
        END;

    START TRANSACTION;
    -- Validate game with id exists
        SELECT COUNT(*) INTO game_exists 
            FROM games 
        WHERE game_id = g_game_id;
        
        IF game_exists = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Game not found';
        END IF;

        DELETE FROM games
        WHERE game_id = g_game_id;

        SET rows_affected = ROW_COUNT();
    COMMIT;
END //
DELIMITER ;