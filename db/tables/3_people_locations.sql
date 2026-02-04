CREATE OR REPLACE TABLE people_locations(
    person_location_id int auto_increment UNIQUE NOT NULL,
    person_id int NOT NULL,
    location_id int NOT NULL,

    primary key (person_location_id),
    foreign key (person_id) REFERENCES people(person_id),
    foreign key (location_id) REFERENCES locations(location_id)
);