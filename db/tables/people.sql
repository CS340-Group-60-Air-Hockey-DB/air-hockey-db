CREATE OR REPLACE people(
    person_id int auto_increment unique NOT NULL
    first_name varchar(50) NOT NULL
    last_name varchar(50) NOT NULL
    gender enum('female', 'male', 'other', 'prefer not to say')
    dob Date
    email varchar(255) unique
    phone_num varchar(25) unique
    street_address_1 varchar(255)
    street_address_2 varchar(255)
    city varchar(255)
    state varchar(255)
    country varchar(255) NOT NULL default "USA"
    zip_code varchar(255)

    primary key (person_id)
)