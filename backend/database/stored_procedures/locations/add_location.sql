DROP PROCEDURE IF EXISTS sp_add_location;

DELIMITER //

CREATE PROCEDURE sp_add_location(
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
    IN p_note VARCHAR(10000)
)
BEGIN
    INSERT INTO locations (
        table_qty, email, phone_num, street_address_1, street_address_2,
        city, `state`, country, zip_code, type_of_address, location_name, note
    )
    VALUES (
        p_table_qty, p_email, p_phone_num, p_street_address_1, p_street_address_2,
        p_city, p_state, p_country, p_zip_code, p_type_of_address, p_location_name, p_note
    );
END //

DELIMITER ;