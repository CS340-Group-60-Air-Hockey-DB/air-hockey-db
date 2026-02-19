-- Competitive Air Hockey Database
-- Alexandria Duell and Rita Berglund 
-- Group 60: House of Pucks

--------------------------------- PURPOSE ---------------------------------
-- This file contains DML (Data Manipulation Language) to apply CREATE, 
-- READ, UPDATE, + DELETE (CRUD) queries to the tables.

-- Tables that do not have all CRUD queries, will state the reason why.

------------------------------ QUERY OVERVIEW ------------------------------
-- All queries use a colon (:) to indicate a variable coming from the backend 
-- application.

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
    "state" = :"state",
    country = :country,
    zip_code = :zip_code
WHERE person_id = :person_id;

----- DELETE -----
-- There is no DELETE for this table, as the community wants to keep data integrity for past matches


---------------
-- locations --
---------------
----- CREATE -----
INSERT INTO locations(table_qty, email, phone_num, street_address_1, street_address_2, city, "state", country, zip_code, type_of_address, location_name, notes)
VALUES (:table_qty, :email, :phone_num, :street_address_1, :street_address_2, :city, :"state", :country, :zip_code, :type_of_address, :location_name, :notes);

----- READ -----
-- Get all data
CREATE OR REPLACE VIEW locations_with_owners AS
SELECT l.location_id, l.location_name, 
        CONCAT(p.first_name, ' ', p.last_name) as "owner", 
    	l.table_qty, l.email, l.phone_num, l.street_address_1, l.street_address_2, 
        l.city, l.state, l.country, l.zip_code, l.type_of_address, l.notes
        from locations as l 
JOIN people_locations as pl on pl.location_id = l.location_id 
INNER JOIN people as p on p.person_id = pl.person_id
ORDER BY l.location_name;

SELECT * FROM locations_with_owners
ORDER BY location_name;

SELECT * FROM locations_with_owners
WHERE location_id = :location_id;

-- Find locations by owner id
SELECT l.location_id, l.location_name,
    CONCAT(p.first_name, ' ', p.last_name) as "owner",
    l.table_qty, l.email, l.phone_num, l.street_address_1, l.street_address_2,
    l.city, l.state, l.country, l.zip_code, l.type_of_address, l.notes
    from locations as l
JOIN people_locations as pl on pl.location_id = l.location_id
INNER JOIN people as p on p.person_id = pl.person_id
WHERE p.person_id = :person_id
ORDER BY l.location_name;

----- UPDATE -----
UPDATE locations 
SET table_qty = :table_qty, 
    email = :email,
    phone_num = :phone_num,
    street_address_1 = :street_address_1,
    street_address_2 = :street_address_2,
    city = :city,
    "state" = :"state",
    country = :country,
    zip_code = :zip_code,
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
SELECT * FROM people_locations;

----- UPDATE -----
UPDATE people_locations
SET person_id = :update_person_id,
    location_id = :update_location_id
WHERE person_id = :curr_person_id AND
    location_id = :curr_location_id;

----- DELETE -----
DELETE FROM people_locations
WHERE person_id = :person_id AND
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

-- Get data by ID
SELECT * from matches
WHERE match_id = :match_id;

-- Get all data from matches with foreign keys view
CREATE OR REPLACE VIEW matches_with_fks AS
    SELECT
        l.location_name,
        CONCAT (p.first_name, ' ', p.last_name) as "winner",
        m.start_datetime,
        m.end_datetime,
        m.set_max,
        m.faceoff_type,
        m.match_type,
        m.match_status,
        m.note
    from
        matches as m
        LEFT JOIN locations as l on l.location_id = m.location_id
        LEFT JOIN people as p on p.person_id = m.winner_id
    ORDER BY
        m.start_datetime;
        
SELECT * from matches_with_fks
ORDER BY match_status;

-- Get all locations in matches
SELECT l.location_id, l.location_name FROM matches as m
INNER JOIN locations as l on l.location_id = m.location_id
ORDER BY l.location_name;

-- Get all people in matches
SELECT p.person_id, CONCAT(p.first_name, ' ', p.last_name) as "name" FROM matches as m
INNER JOIN player_matches as pm on pm.match_id = m.match_id 
INNER JOIN people as p on p.person_id = pm.player_id
ORDER BY p.first_name;

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
INSERT INTO "sets"(match_id, winner_id, set_num, start_datetime, end_datetime, set_status)
VALUES (:match_id, :winner_id, :set_num, :start_datetime, :end_datetime, :set_status);

----- READ -----
-- Get all data
SELECT match_id,
    CONCAT(p.first_name, ' ', p.last_name) as winner, 
    set_num,
    start_datetime, 
    end_datetime,
    set_status as status
from "sets"
JOIN people as p on p.person_id = "sets".winner_id
ORDER BY match_id;

-- Get data by ID
SELECT * from "sets"
WHERE set_id = :set_id;

----- UPDATE -----
UPDATE "sets"
SET match_id = :match_id, 
    winner_id = :winner_id, 
    set_num = :set_num, 
    start_datetime = :start_datetime, 
    end_datetime = :end_datetime, 
    set_status = :set_status
WHERE set_id = :set_id;

----- DELETE -----
DELETE FROM "sets"
WHERE set_id = :set_id;


-----------
-- games --
-----------
----- CREATE -----
INSERT INTO games(player_1_score, player_2_score, set_id, game_num, game_status, start_datetime, end_datetime)
VALUES (:player_1_score, :player_2_score, :set_id, :game_num, :game_status, :start_datetime, :end_datetime);

----- READ -----
-- Get all data
SELECT game_id, m.match_id, g.set_id, game_num, 
    player_1_score, player_2_score, game_status, 
    (
        CASE 
            WHEN player_1_score = 7 THEN CONCAT(p1.first_name, ' ', p1.last_name)
            WHEN player_2_score = 7 THEN CONCAT(p2.first_name, ' ', p2.last_name)
            ELSE NULL
        END
    ) as winner,
    g.start_datetime, g.end_datetime
from games as g
JOIN sets as s on s.set_id = g.set_id
JOIN matches as m on m.match_id = s.match_id
JOIN player_matches AS pm1 ON pm1.match_id = m.match_id AND pm1.player_order = 'player_1'
JOIN player_matches AS pm2 ON pm2.match_id = m.match_id AND pm2.player_order = 'player_2'
JOIN people AS p1 ON p1.person_id = pm1.player_id
JOIN people AS p2 ON p2.person_id = pm2.player_id
ORDER BY set_id;

-- Get data by ID
SELECT * from games
WHERE game_id = :game_id;

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
DELETE FROM games
WHERE game_id = :game_id;


---------------------
-- match_officials --
---------------------
----- CREATE -----
INSERT INTO match_officials (official_person_id, set_id, official_type)
VALUES (:official_person_id, :set_id, :official_type);

----- READ -----
-- Get all data
SELECT CONCAT(p.first_name, ' ', p.last_name) as name,
    mo.official_type,
    m.match_id as match_num,
    s.set_num
from match_officials as mo
JOIN "sets" as s on s.set_id = mo.set_id
JOIN matches as m on m.match_id = s.match_id
JOIN people as p on p.person_id = mo.official_person_id
ORDER BY mo.set_id;

----- UPDATE -----
UPDATE match_officials
SET official_person_id = :official_person_id,
    set_id = :set_id,
    official_type = :official_type
WHERE match_official_id = :match_official_id;

----- DELETE -----
DELETE FROM match_officials
WHERE match_official_id = :match_official_id;


--------------------
-- player_matches --
--------------------
----- CREATE -----
INSERT INTO player_matches(player_id, match_id, starting_side, player_order)
VALUES (:player_id, :match_id, :starting_side, :player_order);

----- READ -----
-- Get all data
SELECT pm.match_id,
    CONCAT(p.first_name, ' ', p.last_name) as "player_name",
    CONCAT(p_opp.first_name, ' ', p_opp.last_name) as "opponent",
    pm.player_order,
    pm.starting_side
from player_matches as pm
JOIN people as p on p.person_id = pm.player_id
JOIN player_matches as pm_opp on pm_opp.match_id = pm.match_id
    AND pm_opp.player_id != pm.player_id
JOIN people as p_opp on pm_opp.player_id = p_opp.person_id
ORDER BY match_id;

-- Get by match id
SELECT * from player_matches
WHERE match_id = :match_id
ORDER BY match_id;

-- Get by player (person) id
SELECT * from player_matches
WHERE player_id = :person_id
ORDER BY match_id;

----- UPDATE -----
UPDATE player_matches
SET player_id = :player_id,
    match_id = :match_id,
    starting_side = :starting_side,
    player_order = :player_order
WHERE player_match_id = :player_match_id;

----- DELETE -----
DELETE FROM player_matches
WHERE player_match_id = :player_match_id;