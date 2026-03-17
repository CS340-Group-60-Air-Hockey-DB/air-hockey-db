DROP PROCEDURE IF EXISTS sp_update_set;
DELIMITER //

CREATE PROCEDURE sp_update_set(
    IN p_set_id INT,
    IN p_match_id INT,
    IN p_winner_id INT,
    IN p_set_num INT,
    IN p_start_datetime DATETIME,
    IN p_end_datetime DATETIME,
    IN p_set_status VARCHAR(50),
    OUT p_rows_affected INT,
    OUT p_error_message VARCHAR(255)
)
BEGIN
    SET p_error_message = NULL;

    UPDATE sets
    SET match_id = p_match_id,
        winner_id = p_winner_id,
        set_num = p_set_num,
        start_datetime = p_start_datetime,
        end_datetime = p_end_datetime,
        set_status = p_set_status
    WHERE set_id = p_set_id;

    SET p_rows_affected = ROW_COUNT();
END //
DELIMITER ;