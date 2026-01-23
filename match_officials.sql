CREATE TABLE match_officials (
    match_official_id int NOT NULL AUTO_INCREMENT UNIQUE,
    official_person_id int NOT NULL,
    match_id int NULL,
    set_id int NULL,
    official_type enum('referee', 'witness') NOT NULL,
    PRIMARY KEY (match_official_id),
    FOREIGN KEY (official_person_id) REFERENCES people(person_id),
    FOREIGN KEY (match_id) REFERENCES matches(match_id),
    FOREIGN KEY (set_id) REFERENCES sets(set_id)
);