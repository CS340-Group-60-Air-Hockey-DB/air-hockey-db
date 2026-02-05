SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS people_locations;
DROP TABLE IF EXISTS player_matches;
DROP TABLE IF EXISTS match_officials;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS sets;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS people;
SET FOREIGN_KEY_CHECKS = 1;

CREATE OR REPLACE TABLE people(
    person_id int auto_increment unique NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    gender enum('female', 'male', 'other', 'prefer not to say'),
    dob Date,
    email varchar(255) unique,
    phone_num varchar(25),
    street_address_1 varchar(255),
    street_address_2 varchar(255),
    city varchar(255),
    state varchar(255),
    country varchar(255) NOT NULL default "USA",
    zip_code varchar(255),

    primary key (person_id)
);

CREATE OR REPLACE TABLE locations (
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
    PRIMARY KEY (location_id),
    CONSTRAINT unique_address UNIQUE (
        street_address_1,
        street_address_2,
        city,
        state,
        country,
        zip_code
    )
);

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

CREATE OR REPLACE TABLE sets (
    set_id int auto_increment not null unique,
    match_id int not null,
    winner_id int,
    set_num int not null,
    start_datetime datetime,
    end_datetime datetime,
    set_status enum ('scheduled', 'in_progress', 'completed', 'abandoned') not NULL default 'scheduled',

    primary key (set_id),

    foreign key (match_id) references matches(match_id),
    foreign key (winner_id) references people(person_id),

    UNIQUE (match_id, set_num),

    constraint chk_set_num check (set_num between 1 and 7),
    constraint chk_match_times check (
        end_datetime IS NULL OR 
        end_datetime > start_datetime
    ),
    constraint chk_winner check (
            set_status = 'completed' AND 
            winner_id IS NOT NULL AND 
            set_num between 2 and 7
    )

    -- Needed Constraints left:
        -- - A set must contain at least 4 games when completed: I think we will need to handle this
        --   in our DML script as it requires counting rows in the games table.
        -- - set_num cannot exceed the parent match's set_max value: I think similar issue for this since set_max
        --   is stored in the matches table.
);

CREATE OR REPLACE TABLE games(
    game_id int(11) auto_increment UNIQUE NOT NULL,
    player_1_score tinyint(4) NOT NULL DEFAULT 0,
    player_2_score tinyint(4) NOT NULL DEFAULT 0,
    set_id int(11) NOT NULL,
    game_num tinyint(4) NOT NULL,
    game_status enum ('scheduled', 'in_progress', 'completed', 'abandoned') not NULL default 'scheduled',
    start_datetime datetime,
    end_datetime datetime,

    primary key (game_id),
    foreign key (set_id) references sets(set_id),
    constraint chk_player_scores CHECK (
        player_1_score BETWEEN 0 AND 7 AND 
        player_2_score BETWEEN 0 AND 7
    ),
    constraint chk_player_end_scores CHECK (
        game_status = 'completed' AND
        (player_1_score = 7 AND player_2_score < 7) OR 
        (player_1_score < 7 AND player_2_score = 7)
    ),
    constraint chk_winner CHECK (
       (
            game_status = 'completed' AND 
            (player_1_score = 7 OR player_2_score = 7)
        ) OR 
       (
            game_status != 'completed' AND 
            (player_1_score != 7 AND player_2_score != 7)
       )
    ),
    CONSTRAINT chk_match_times CHECK (
        end_datetime IS NULL OR 
        end_datetime > start_datetime
    )
);

CREATE OR REPLACE TABLE match_officials (
    match_official_id int NOT NULL AUTO_INCREMENT UNIQUE,
    official_person_id int NOT NULL,
    set_id int NOT NULL,
    official_type enum('referee', 'witness') NOT NULL,
    PRIMARY KEY (match_official_id),
    FOREIGN KEY (official_person_id) REFERENCES people(person_id),
    FOREIGN KEY (set_id) REFERENCES sets(set_id)
);

CREATE OR REPLACE TABLE player_matches(
    player_match_id int(11) NOT NULL auto_increment,
    player_id int(11) NOT NULL,
    match_id int(11) NOT NULL,
    starting_side enum('left', 'right') NOT NULL,
    player_order enum('player_1', 'player_2') NOT NULL,

    primary key (player_match_id),

    foreign key (player_id) references people(person_id) ON DELETE CASCADE,
    foreign key (match_id) references matches(match_id) ON DELETE CASCADE,

    constraint unique_player_match unique (player_id, match_id)
);

CREATE OR REPLACE TABLE people_locations(
    person_location_id int auto_increment UNIQUE NOT NULL,
    person_id int NOT NULL,
    location_id int NOT NULL,

    primary key (person_location_id),
    foreign key (person_id) REFERENCES people(person_id),
    foreign key (location_id) REFERENCES locations(location_id)
);
