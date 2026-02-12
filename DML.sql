-- Competitive Air Hockey Database
-- Alexandria Duell and Rita Berglund 
-- (House of Pucks)

--------------------------------- PURPOSE ---------------------------------
-- This file contains DML (Data Manipulation Language) to apply CREATE, 
-- READ, UPDATE, + DELETE (CRUD) queries to the tables.

-- Tables that do not have all CRUD queries, will state it.

------------------------------ QUERY OVERVIEW ------------------------------
-- 1. people (CRU)
-- 2. locations (CRU)
        -- READ: Has a query to add a view to include owner names
              -- select is for the view described above
-- 3. people_locations (CUD)
-- 4. matches (CRUD)
-- 5. sets (CRUD)
-- 6. games (CRUD)
-- 7. match_officials (CRUD)
-- 8. player_matches (CRUD)


------------
-- people --
------------
----- CREATE -----
INSERT INTO people (first_name, last_name, gender, dob, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code)
VALUES (:first_name, :last_name, :gender, :dob, :email, :phone_num, :street_address_1, :street_address_2, :city, :state, :country, :zip_code);

----- READ -----
-- Get all data, order by first name
SELECT * from people
ORDER BY first_name;

-- Get data by id
SELECT * from people
WHERE person_id = :person_id;

----- UPDATE -----
UPDATE people
SET first_name = :first_name, 
    last_name = :last_name, 
    gender = :gender, 
    dob = :dob, 
    email = :email,
    phone_num = :phone_num,
    street_address_1 = :street_address_1,
    street_address_2 = :street_address_2,
    city = :city,
    `state` = :`state`,
    country = :country
    zip_code = :zip_code
WHERE person_id = :person_id;

----- DELETE -----
-- There is no DELETE for this table, as the community wants to keep data integrity for past matches


---------------
-- locations --
---------------
----- CREATE -----
INSERT INTO locations(table_qty, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code, type_of_address, location_name, notes)
VALUES (:table_qty, :email, :phone_num, :street_address_1, :street_address_2, :city, :`state`, :country, :zip_code, :type_of_address, :location_name, :notes);

----- READ -----
-- Get all data
CREATE OR REPLACE VIEW locations_with_owners AS
SELECT l.location_id, l.location_name, 
        CONCAT(p.first_name, ' ', p.last_name) as owner, 
    	l.table_qty, l.email, l.phone_num, l.street_address_1, l.street_address_2, 
        l.city, l.state, l.country, l.zip_code, l.type_of_address, l.notes
        from locations as l 
JOIN people_locations as pl on pl.location_id = l.location_id 
INNER JOIN people as p on p.person_id = pl.person_id;

SELECT * FROM locations_with_owners
ORDER BY location_name;

----- UPDATE -----
UPDATE locations 
SET table_qty = :table_qty, 
    email = :email,
    phone_num = :phone_num,
    street_address_1 = :street_address_1,
    street_address_2 = :street_address_2,
    city = :city,
    `state` = :`state`,
    country = :country
    zip_code = :zip_code
    type_of_address = :type_of_address, 
    location_name = :location_name, 
    notes = :notes
WHERE location_id = :location_id;

----- DELETE -----
-- There is no DELETE for this table, as the community wants to keep data integrity for past matches


----------------------
-- people_locations --
----------------------
----- CREATE -----
INSERT INTO people_locations(person_id, location_id)
VALUES (:person_id, :location_id);

----- READ -----
-- Not needed for a junction table.

----- UPDATE -----
UPDATE people_locations
SET person_id = update_person_id
    location_id = update_location_id
WHERE person_id = curr_person_id OR
    location_id = curr_location_id;

----- DELETE -----
DELETE people_locations
WHERE person_id = :person_id OR
    location_id = :location_id;


-------------
-- matches --
-------------
----- CREATE -----
INSERT INTO matches(set_max, faceoff_type, start_datetime, end_datetime, location_id, match_type, note, match_status)
VALUES (:set_max, :faceoff_type, :start_datetime, :end_datetime, :location_id, :match_type, :note, 'scheduled');

----- READ -----
-- Get all data
SELECT * from matches
ORDER BY match_status;

----- UPDATE -----
UPDATE matches
SET set_max = :set_max, 
    faceoff_type = :faceoff_type, 
    start_datetime = :start_datetime, 
    end_datetime = :end_datetime, 
    location_id = :location_id, 
    match_type = :match_type, 
    note = :note, 
    match_status = :match_status
WHERE match_id = :match_id;

----- DELETE -----
DELETE FROM matches 
WHERE match_id = :match_id;


----------
-- sets --
----------
----- CREATE -----
INSERT INTO `sets`(match_id, winner_id, set_num, start_datetime, end_datetime, set_status)
VALUES (:match_id, :winner_id, :set_num, :start_datetime, :end_datetime, :set_status);

----- READ -----
-- Get all data
SELECT * from `sets`
ORDER BY match_id;

----- UPDATE -----
UPDATE `sets`
SET match_id = :match_id, 
    winner_id = :winner_id, 
    set_num = :set_num, 
    start_datetime = :start_datetime, 
    end_datetime = :end_datetime, 
    set_status = :set_status
WHERE set_id = :set_id;

----- DELETE -----
DELETE FROM `sets`
WHERE set_id = :set_id;


-----------
-- games --
-----------
----- CREATE -----
INSERT INTO games(player_1_score, player_2_score, set_id, game_num, game_status, start_datetime, end_datetime)
VALUES (:player_1_score, :player_2_score, :set_id, :game_num, :game_status, :start_datetime, :end_datetime);

----- READ -----
-- Get all data
SELECT * from games
ORDER BY set_id;

----- UPDATE -----
UPDATE games
SET player_1_score = :player_1_score,
    player_2_score = :player_2_score,
    set_id = :set_id,
    game_num = :game_num,
    game_status = :game_status,
    start_datetime = :start_datetime,
    end_datetime = :end_datetime
WHERE game_id = :game_id;

----- DELETE -----
DELETE games
WHERE game_id = :game_id;


---------------------
-- match_officials --
---------------------
----- CREATE -----
INSERT INTO match_officials (official_person_id, set_id, official_type)
VALUES (:official_person_id, :set_id, :official_type);

----- READ -----
-- Get all data
SELECT * from match_officials
ORDER BY set_id;

----- UPDATE -----
UPDATE games
SET official_person_id = :official_person_id,
    set_id = :set_id,
    official_type = :official_type
WHERE match_official_id = :match_official_id;

----- DELETE -----
DELETE match_officials
WHERE match_official_id = :match_official_id;


--------------------
-- player_matches --
--------------------
----- CREATE -----
INSERT INTO player_matches(player_id, match_id, starting_side, player_order)
VALUES player_matches(:player_id, :match_id, :starting_side, :player_order);

----- READ -----
-- Get all data
SELECT * from player_matches
ORDER BY match_id;

----- UPDATE -----
UPDATE player_matches
SET player_id = :player_id,
    match_id :match_id,
    starting_side = :starting_side,
    player_order = :player_order
WHERE player_match_id = :player_match_id;

----- DELETE -----
DELETE player_matches
WHERE player_match_id = :player_match_id;