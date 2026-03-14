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
    IN p_location_id INT,
    IN p_person_id INT,

    OUT rows_affected INT,
    OUT error_message VARCHAR(255)
)
BEGIN
    DECLARE updated_person_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET rows_affected = -99;
            SET error_message = NULL;

            GET DIAGNOSTICS CONDITION 1
                error_message = MESSAGE_TEXT;
            ROLLBACK;
        END;

    START TRANSACTION;
    -- Update the Location
        UPDATE locations
        SET
            table_qty = p_table_qty,
            email = NULLIF(p_email, ''),
            phone_num = NULLIF(p_phone_num, ''),
            street_address_1 = p_street_address_1,
            street_address_2 = COALESCE(NULLIF(p_street_address_2, ''), ''),
            city = p_city,
            `state` = p_state,
            country = p_country,
            zip_code = p_zip_code,
            type_of_address = p_type_of_address,
            location_name = NULLIF(p_location_name, ''),
            notes = NULLIF(p_note, '')
        WHERE location_id = p_location_id;

        -- Check if the location_id exists
        SET rows_affected = ROW_COUNT();
        IF rows_affected = 0 THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Location was not found. No rows were updated.';
        END IF;

    -- Update the people_locations table if person_id is different for the location_id
    SELECT person_id INTO updated_person_id
    FROM people_locations
    WHERE location_id = p_location_id
    LIMIT 1;

    IF updated_person_id != p_person_id OR
        (updated_person_id IS NULL AND p_person_id IS NOT NULL) OR
        (updated_person_id IS NOT NULL AND p_person_id IS NULL) THEN
        
        IF p_person_id IS NOT NULL THEN
        -- If no person_location row exists, insert data
        -- Else, update the row with the location_id
            INSERT INTO people_locations (person_id, location_id)
            VALUES (p_person_id, p_location_id)
            ON DUPLICATE KEY UPDATE person_id = p_person_id;
        ELSE
        -- DELETE when no p_person_id
            DELETE FROM people_locations
            WHERE location_id = p_location_id;
        END IF;
    END IF;

    COMMIT;
END //

DELIMITER ;