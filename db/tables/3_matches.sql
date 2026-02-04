CREATE OR REPLACE TABLE matches (
    match_id int NOT NULL AUTO_INCREMENT UNIQUE,
    location_id int NOT NULL,
    winner_id int NULL,
    set_max int NOT NULL DEFAULT 3,
    faceoff_type enum('standard', 'puck flip') NOT NULL DEFAULT 'standard',
    start_datetime datetime NOT NULL,
    end_datetime datetime NULL,
    match_type enum('challenge', 'tournament', 'league', 'other') NOT NULL,
    match_status enum('scheduled', 'in_progress', 'completed', 'abandoned') NOT NULL DEFAULT 'scheduled',
    note varchar(10000) NULL,
    PRIMARY KEY (match_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id),
    FOREIGN KEY (winner_id) REFERENCES people(person_id),
    CONSTRAINT chk_set_max CHECK (set_max IN (3, 5, 7)),
    CONSTRAINT chk_match_times CHECK (end_datetime IS NULL OR end_datetime > start_datetime),
    CONSTRAINT chk_winner_status CHECK (
        (match_status != 'completed' AND winner_id IS NULL) OR
        (match_status = 'completed')
    )
);