CREATE TABLE locations (
    location_id int NOT NULL AUTO_INCREMENT UNIQUE,
    owned_by_player_id int,
    table_qty int NOT NULL DEFAULT 0,
    email varchar(255) UNIQUE,
    phone_num varchar(25),
    street_address_1 varchar(255) NOT NULL,
    street_address_2 varchar(255),
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    zip_code varchar(255) NOT NULL,
    type_of_address enum('residential', 'commercial', 'club', 'bar', 'other') NOT NULL,
    location_name varchar(255),
    notes varchar(10000),
    PRIMARY KEY (location_id)
    FOREIGN KEY (owned_by_player_id) REFERENCES players(player_id)
);