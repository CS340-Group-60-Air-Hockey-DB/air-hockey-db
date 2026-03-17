DROP PROCEDURE IF EXISTS sp_delete_set;
DELIMITER //

CREATE PROCEDURE sp_delete_set(
    IN p_set_id INT,
    OUT p_rows_affected INT,
    OUT p_error_message VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_error_message = 'Cannot delete this set. It may have games associated with it.';
        SET p_rows_affected = -99;
        ROLLBACK;
    END;

    SET p_error_message = NULL;

    DELETE FROM sets
    WHERE set_id = p_set_id;

    SET p_rows_affected = ROW_COUNT();
END //
DELIMITER ;