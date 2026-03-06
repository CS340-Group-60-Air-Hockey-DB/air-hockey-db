DROP PROCEDURE IF EXISTS sp_add_person;
DELIMITER //

CREATE PROCEDURE sp_add_person(
    IN p_first_name varchar(50),
    IN p_last_name varchar(50),
    IN p_gender enum('female', 'male', 'other', 'prefer not to say'),
    IN p_dob Date,
    IN p_email varchar(255),
    IN p_phone_num varchar(25),
    IN p_street_address_1 varchar(255),
    IN p_street_address_2 varchar(255),
    IN p_city varchar(255),
    IN p_state varchar(255),
    IN p_country varchar(255),
    IN p_zip_code varchar(255),
    OUT person_id int(11),
    OUT error_message varchar(255)
)
BEGIN
-- In case of an error, set the person_id to -99
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET person_id = -99;
            SET error_message = NULL;

            GET DIAGNOSTICS CONDITION 1
                error_message = MESSAGE_TEXT;
            ROLLBACK;
        END;
    
    START TRANSACTION;
    -- Validate Input
    -- Names
        If p_first_name IS NULL OR TRIM(p_first_name) = '' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'First name must be provided.';
        END IF;
        IF p_last_name IS NULL OR TRIM(p_last_name) = '' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Last name must be provided.';
        END IF;
    -- Email must contain @ and a dot after it
        IF p_email IS NOT NULL AND p_email NOT REGEXP '^[^@]+@[^@]+\.[^@]+$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid email format.';
        END IF;
    -- DOB must not be in the future
        IF p_dob IS NOT NULL AND p_dob > CURDATE() THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Date of birth cannot be in the future.';
        END IF;
        
    -- Insert Values
    -- COALESCE makes the default value of the attribute if a value is null
        INSERT INTO people (first_name, last_name, gender, dob, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code)
        VALUES (TRIM(p_first_name), TRIM(p_last_name), p_gender, p_dob, p_email, p_phone_num, p_street_address_1, p_street_address_2, p_city, p_state, COALESCE(p_country, 'USA'), p_zip_code);

    -- Get the last inserted id 
        SET person_id = LAST_INSERT_ID();
    COMMIT;
END //
DELIMITER ;