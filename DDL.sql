-- Competitive Air Hockey Database
-- Alexandria Duell and Rita Berglund (House of Pucks)

-- This file contains the complete DDL (Data Definition Language) and sample data for the database.
-- Schema includes: people, locations, matches, sets, games, player_matches, match_officials, people_locations
-- This file provides insert statements into the aforementioned tables. 

----------------------------------------------------------------------
-- Disable foreign key checks to allow dropping tables in any order --
----------------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

---------------------
-- Drop all tables --
---------------------
DROP TABLE IF EXISTS people_locations;
DROP TABLE IF EXISTS player_matches;
DROP TABLE IF EXISTS match_officials;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS `sets`;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS people;

-----------------------
-- Create all tables --
-----------------------
CREATE OR REPLACE TABLE people(
    person_id int(11) auto_increment unique NOT NULL,
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
    location_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    table_qty int(11) NOT NULL DEFAULT 0,
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
    match_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    location_id int(11) NOT NULL,
    winner_id int(11) NULL,
    set_max tinyint(4) NOT NULL DEFAULT 3,
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

CREATE OR REPLACE TABLE `sets` (
    set_id int(11) auto_increment not null unique,
    match_id int(11) not null,
    winner_id int(11),
    set_num tinyint(4) not null,
    start_datetime datetime,
    end_datetime datetime,
    set_status enum ('scheduled', 'in_progress', 'completed', 'abandoned') not NULL default 'scheduled',

    primary key (set_id),

    foreign key (match_id) references matches(match_id),
    foreign key (winner_id) references people(person_id),

    constraint chk_set_num check (set_num between 1 and 7),
    constraint chk_match_times check (
        end_datetime IS NULL or 
        end_datetime > start_datetime
    ),
    constraint chk_winner check (
        set_num <= 2 or 
        set_status != 'completed' or
        winner_id IS NOT NULL
    ),
    constraint unique_match_set UNIQUE (match_id, set_num)

    -- Needed Constraints left (via API Endpoint Function Check or a Database Trigger):
        -- - A set must contain at least 4 games when completed
        -- - set_num cannot exceed the parent match's set_max value
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
    foreign key (set_id) references `sets`(set_id),
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
    match_official_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    official_person_id int(11) NOT NULL,
    set_id int(11) NOT NULL,
    official_type enum('referee', 'witness') NOT NULL,
    PRIMARY KEY (match_official_id),
    FOREIGN KEY (official_person_id) REFERENCES people(person_id),
    FOREIGN KEY (set_id) REFERENCES `sets`(set_id)
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
    person_location_id int(11) auto_increment UNIQUE NOT NULL,
    person_id int(11) NOT NULL,
    location_id int(11) NOT NULL,

    primary key (person_location_id),
    foreign key (person_id) REFERENCES people(person_id),
    foreign key (location_id) REFERENCES locations(location_id)
);

------------------------------------
-- Insert sample data into tables --
------------------------------------
-- The data below represents three matches with different outcomes:
--   Match 1 (completed): Alex Adams vs Evan Cole at Paddle Palace Bar, Feb 1 2026
--       Officials Quinn Foster and Aisling O'Connor officiated various sets
--       Alex Adam wins 2 out of 3 sets
--   Match 2 (abandoned): Natalie Perez vs Aisling O'Connor tournament that was cancelled
--   Match 3 (scheduled): Casey Martinez vs Quinn Foster at The Foundation, May 11 2026
INSERT INTO people(first_name, last_name, gender, dob, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code)
VALUES ('Alex', 'Adams', 'female', '1996-03-05', 'alexadams@email.com', '987-547-4251', '6827 Glenwood Ave', null, 'Raleigh', 'NC', 'USA', '27603'),
('Casey', 'Martinez', 'male', '2001-03-25', 'casey.martinez@example.com', NULL, '789 Pine Rd', 'Apt 5C', 'Chicago', 'IL', 'USA', '60616'),
('Evan', 'Cole', NULL, '2010-12-01', NULL, NULL, NULL, NULL, NULL, 'NC', 'USA', NULL),
('Dylan', 'Moore', 'male', '2012-11-13', NULL, '336-555-4419', NULL, NULL, NULL, 'TX', 'USA', NULL),
('Natalie', 'Perez', 'female', '1993-07-27', 'natalie.perez@email.com', '305-555-9183', '670 Coral Way', NULL, 'Miami', 'FL', 'USA', '33145'),
('Quinn', 'Foster', 'prefer not to say', '1987-10-18', NULL, NULL, NULL, NULL, NULL, NULL, 'USA', NULL),
('Aisling', "O'Connor", 'female', '1999-02-09', 'aoife.oconnor@example.ie', NULL, '3 Trinity Lane', NULL, 'Dublin', NULL, 'Ireland', 'D02 XY76');

INSERT INTO locations(table_qty, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code, type_of_address, location_name, notes)
VALUES (4, null, '919-329-9031', '1234 Foundation Lane', null, 'Raleigh', 'NC', 'USA', '27603', 'residential', 'The Foundation', null),
(1, 'contact@paddlepalace.com', '919-555-0142', '789 Brewhouse Lane', 'Suite 2B', 'Durham', 'NC', 'USA', '27701', 'bar', 'The Paddle Palace Bar & Grill', 'Air hockey table in the game room area, popular weekend spot'),
(0, 'events@grandplazahotel.com', '919-555-0298', '456 Hospitality Boulevard', null, 'Cary', 'NC', 'USA', '27511', 'other', 'Grand Plaza Hotel & Conference Center', 'Potential tournament venue, no permanent tables but large event space available'),
(0, 'info@spacecitysports.com', '713-555-0891', '8500 Kirby Drive', null, 'Houston', 'TX', 'USA', '77054', 'other', 'Space City Sports Complex', 'Major sports venue, interested in hosting regional + world air hockey championships.');

INSERT INTO matches(set_max, faceoff_type, start_datetime, end_datetime, location_id, match_type, note, match_status)
VALUES 
(3, 'standard', '2026-02-01 14:31:39', '2026-02-01 15:48:06', 
    (SELECT location_id from locations where email = 'contact@paddlepalace.com'), 
    'challenge', null, 'completed'),
(5, 'puck flip', '2024-01-15 19:00:00', null, 
    (SELECT location_id from locations where email = 'events@grandplazahotel.com'), 
    'tournament', 'Tournament was cancelled.', 'abandoned'),
(7, 'standard', '2026-05-11 18:00:00', null, 
    (SELECT location_id from locations where email is null and type_of_address = 'residential' and location_name = 'The Foundation'), 
    'challenge', null, 'scheduled');

INSERT INTO `sets`(match_id, winner_id, set_num, start_datetime, end_datetime, set_status)
VALUES (1, null, 1, '2026-02-01 14:31:39', '2026-02-01 14:53:22', 'completed'),
(1, null, 2, '2026-02-01 14:55:10', '2026-02-01 15:19:45', 'completed'),
(1, 1, 3, '2026-02-01 15:21:33', '2026-02-01 15:48:06', 'completed'), 
(2, null, 1, '2024-01-15 19:00:00', null, 'abandoned'),
(2, null, 2, null, null, 'abandoned'),
(2, null, 3, null, null, 'abandoned'),
(2, null, 4, null, null, 'abandoned'),
(2, null, 5, null, null, 'abandoned'),
(3, null, 1, '2026-05-11 18:00:00', null, 'scheduled'),
(3, null, 2, null, null, 'scheduled'),
(3, null, 3, null, null, 'scheduled'),
(3, null, 4, null, null, 'scheduled'),
(3, null, 5, null, null, 'scheduled'),
(3, null, 6, null, null, 'scheduled'),
(3, null, 7, null, null, 'scheduled');

INSERT INTO games(player_1_score, player_2_score, set_id, game_num, game_status, start_datetime, end_datetime)
-- Games for Set 1
VALUES 
(7, 3, 
    1, 
    1, 
    'completed', '2026-02-01 14:31:39', '2026-02-01 14:36:15'),
(7, 6, 
    1, 
    2, 
    'completed', '2026-02-01 14:36:45', '2026-02-01 14:43:20'),
(7, 3, 
    1, 
    3, 
    'completed', '2026-02-01 14:43:50', '2026-02-01 14:47:35'),
(7, 5, 
    1, 
    4, 
    'completed', '2026-02-01 14:48:05', '2026-02-01 14:53:22'),
-- Games for Set 2
(3, 7, 
    2, 
    1, 
    'completed', '2026-02-01 14:55:10', '2026-02-01 14:59:05'),
(7, 2, 
    2, 
    2, 
    'completed', '2026-02-01 14:59:35', '2026-02-01 15:03:10'),
(7, 6, 
    2, 
    3, 
    'completed', '2026-02-01 15:03:40', '2026-02-01 15:08:25'),
(5, 7, 
    2, 
    4, 
    'completed', '2026-02-01 15:08:55', '2026-02-01 15:13:40'),
(7, 3, 
    2, 
    5, 
    'completed', '2026-02-01 15:14:10', '2026-02-01 15:17:50'),
(7, 4, 
    2, 
    6, 
    'completed', '2026-02-01 15:18:20', '2026-02-01 15:19:45'),
-- Games for Set 3
(7, 1, 
    3, 
    1, 
    'completed', '2026-02-01 15:21:33', '2026-02-01 15:25:20'),
(5, 7, 
    3, 
    2, 
    'completed', '2026-02-01 15:25:50', '2026-02-01 15:30:35'),
(7, 5, 
    3, 
    3, 
    'completed', '2026-02-01 15:31:05', '2026-02-01 15:35:50'),
(7, 1, 
    3, 
    4, 
    'completed', '2026-02-01 15:36:20', '2026-02-01 15:39:45'),
(4, 7, 
    3, 
    5, 
    'completed', '2026-02-01 15:40:15', '2026-02-01 15:44:30'),
(6, 7, 
    3, 
    6, 
    'completed', '2026-02-01 15:44:55', '2026-02-01 15:49:45'),
(7, 6, 
    3, 
    7, 
    'completed', '2026-02-01 15:40:10', '2026-02-01 15:48:06');

INSERT INTO match_officials (official_person_id, set_id, official_type)
VALUES (6, 1, 'referee'),
(6, 
    2, 
    'referee'),
(7, 
    3, 
    'referee'),
(7, 
    1, 
    'witness'),
(7, 
    2, 
    'witness'),
(6, 
    3, 
    'witness');

INSERT INTO player_matches(player_id, match_id, starting_side, player_order)
VALUES 
((select person_id from people where email = 'alexadams@email.com'), 
    (select match_id from matches where match_status = 'completed'), 
    'left', 'player_1'),
((select person_id from people where first_name = 'Evan' and last_name = 'Cole'), 
    1, 'right', 'player_2'),
(5, 
    2, 
    'left', 'player_1'),
(7, 
    2, 
    'right', 'player_2'),
(2, 
    3, 
    'left', 'player_1'),
(6,
    3, 
    'right', 'player_2');

INSERT INTO people_locations(person_id, location_id)
VALUES 
(1, 
    1),
(3, 
    2),
(4, 
    4);

-------------------------------
-- Enable foreign key checks --
-------------------------------
SET FOREIGN_KEY_CHECKS = 1;