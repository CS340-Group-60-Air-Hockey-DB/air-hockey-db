CREATE OR REPLACE players(
    player_id int auto_increment unique NOT NULL
    first_name varchar NOT NULL
    last_name varchar NOT NULL
    gender enum('female', 'male', 'other', 'prefer not to say')
    primary_email varchar unique
    primary_phone_num varchar unique
    street_address_1 varchar 
    street_address_2 varchar
    city varchar
    state varchar
    country varchar NOT NULL default "USA"
    zip_code int

    primary key (player_id)
)