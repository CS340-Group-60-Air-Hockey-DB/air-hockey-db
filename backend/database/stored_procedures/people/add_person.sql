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
    OUT person_id int(11)
)
BEGIN
-- In case of an error, set the person_id to -99
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET person_id = -99;
            ROLLBACK;
        END;

    START TRANSACTION;
        -- Insert Values
        -- COALESCE makes the default value of the attribute if an enum is null
        -- NULLIF on m_note inserts null if the m_note string is empty
            INSERT INTO people (first_name, last_name, gender, dob, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code)
            VALUES (p_first_name, p_last_name, p_gender, p_dob, p_email, p_phone_num, p_street_address_1, p_street_address_2, p_city, p_state, p_country, p_zip_code);

        -- Get the last inserted id 
            SET person_id = LAST_INSERT_ID();
    COMMIT;
END //
DELIMITER ;