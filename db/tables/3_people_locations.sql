CREATE OR REPLACE people_locations(
    person_id int NOT NULL
    location_id int NOT NULL

    primary key (person_location_id)
    foreign key (person_id) references people(person_id)
    foreign key (location_id) references location(location_id)
)