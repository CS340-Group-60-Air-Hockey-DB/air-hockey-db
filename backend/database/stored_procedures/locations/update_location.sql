DROP PROCEDURE IF EXISTS sp_update_location;

DELIMITER //

CREATE PROCEDURE sp_update_location(
    IN p_table_qty INT,
    IN p_email VARCHAR(255),
    IN p_phone_num VARCHAR(25),
    IN p_street_address_1 VARCHAR(255),
    IN p_street_address_2 VARCHAR (255),
    IN p_city VARCHAR(255),
    IN p_state VARCHAR(255),
    IN p_country VARCHAR(255),
    IN p_zip_code VARCHAR(255),
    IN p_type_of_address VARCHAR(255),
    IN p_location_name VARCHAR(255),
    IN p_note VARCHAR(10000),
    IN p_location_id INT
)
BEGIN
    UPDATE locations
    SET
        table_qty = p_table_qty,
        email = p_email,
        phone_num = p_phone_num,
        street_address_1 = p_street_address_1,
        street_address_2 = p_street_address_2,
        city = p_city,
        `state` = p_state,
        country = p_country,
        zip_code = p_zip_code,
        type_of_address = p_type_of_address,
        location_name = p_location_name,
        notes = p_note
    WHERE location_id = p_location_id;
END //

DELIMITER ;