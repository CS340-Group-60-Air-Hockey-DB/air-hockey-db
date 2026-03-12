DROP PROCEDURE IF EXISTS sp_update_person;
DELIMITER //

CREATE PROCEDURE sp_update_person(
    IN p_person_id int(11),
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

    OUT rows_affected int(11),
    OUT error_message varchar(255)
)
BEGIN
    DECLARE email_taken INT DEFAULT 0;
    DECLARE person_exists boolean;

-- In case of an error, set the rows_affected to -99
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET rows_affected = -99;
            SET error_message = null; 

            GET DIAGNOSTICS CONDITION 1
                error_message = MESSAGE_TEXT;
            ROLLBACK;
        END;

    START TRANSACTION;
    -- Validate person_id is not null:
    IF p_person_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'person_id cannot be NULL';
    END IF;

    -- Validate person with id exists
        SELECT COUNT(*) INTO person_exists 
            FROM people 
        WHERE person_id = p_person_id;
        
        IF person_exists = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Person not found';
        END IF;

    -- -- Validate Input -- --
    -- Empty String Validation --
    -- Names
        If TRIM(p_first_name) = '' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "First name must not be an empty string. Pass NULL to keep the current value.";
        END IF;

        IF TRIM(p_last_name) = '' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Last name must not be an empty string. Pass NULL to keep the current value.";
        END IF;

    -- Country 
        IF TRIM(p_country) = '' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Country must not be an empty string. Pass NULL to keep the current value.";
        END IF;

    -- Nullable Fields --
    -- Email must contain @ and a dot after it
        IF p_email IS NOT NULL THEN
            IF  p_email NOT REGEXP '^[^@]+@[^@]+\.[^@]+$' THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid email format.';
            END IF;

        -- Check if the email is taken
            SELECT COUNT(*) INTO email_taken   
                FROM people
            WHERE email = p_email AND person_id != p_person_id;

            IF email_taken > 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'That email address is already in use by another person. Please give another valid email.';
            END IF;
        END IF;

    -- Gender must be one of the enum values
        IF p_gender IS NOT NULL AND p_gender NOT IN ('female', 'male', 'other', 'prefer not to say') THEN
            SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'Invalid gender value. Value must be one of: female, male, other, prefer not to say.';
        END IF;
    -- DOB must not be in the future
        IF p_dob IS NOT NULL AND p_dob > CURDATE() THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Date of birth cannot be in the future.';
        END IF;

    -- Phone number format: xxx-xxx-xxxx
        IF p_phone_num IS NOT NULL AND p_phone_num NOT REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid phone number format. Expected format: xxx-xxx-xxxx';
        END IF;

    -- Update the data if no errors:
        UPDATE people
        SET
        -- Not nullable fields; will result the current data as the default value
            first_name = COALESCE(p_first_name, first_name),
            last_name = COALESCE(p_last_name, last_name),
            country = COALESCE(p_country, country),
            -- Nullable fields: NULL or an empty string clears the field
            gender = p_gender,
            dob = p_dob,
            email = NULLIF(p_email, ''),
            phone_num = NULLIF(p_phone_num, ''),
            street_address_1 = NULLIF(p_street_address_1, ''),
            street_address_2 = NULLIF(p_street_address_2, ''),
            city = NULLIF(p_city, ''),
            state = NULLIF(p_state, ''),
            zip_code = NULLIF(p_zip_code, '')
        WHERE person_id = p_person_id;

        SET rows_affected = ROW_COUNT();
    COMMIT;
END //
DELIMITER ;