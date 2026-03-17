DROP PROCEDURE IF EXISTS sp_add_set;
DELIMITER //

CREATE PROCEDURE sp_add_set(
    IN p_match_id INT,
    IN p_winner_id INT,
    IN p_set_num INT,
    IN p_start_datetime DATETIME,
    IN p_end_datetime DATETIME,
    IN p_set_status VARCHAR(50),
    OUT p_set_id INT,
    OUT p_error_message VARCHAR(255)
)
BEGIN
    DECLARE v_duplicate INT;
    SET p_error_message = NULL;

    -- check if this match already has this set number
    SELECT COUNT(*) INTO v_duplicate
    FROM sets
    WHERE match_id = p_match_id AND set_num = p_set_num;

    IF v_duplicate > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Database error: this match already has a set with that number.';
    ELSE 
        INSERT INTO sets (match_id, winner_id, set_num, start_datetime, end_datetime, set_status)
        VALUES (p_match_id, p_winner_id, p_set_num, p_start_datetime, p_end_datetime, p_set_status);

        SET p_set_id = LAST_INSERT_ID();
    END IF;
END //
DELIMITER ;