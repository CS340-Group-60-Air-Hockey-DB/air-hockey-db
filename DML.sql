-- Competitive Air Hockey Database
-- Alexandria Duell and Rita Berglund (House of Pucks)
-- This file contains DML (Data Manipulation Language) to apply CREATE, READ, UPDATE, + DELETE (CRUD) queries to the tables
-- Tables that do not have all CRUD queries, will state it


------------
-- people --
------------
----- CREATE -----
INSERT INTO people (first_name, last_name, gender, dob, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code)
VALUES (first_name, last_name, gender, dob, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code)

----- READ -----
-- Get all data, order by first name
SELECT * from people
ORDER BY first_name;

-- Get data by id
SELECT * from people
WHERE person_id = person_id

----- UPDATE -----
UPDATE people
SET first_name = first_name, 
    last_name = last_name, 
    gender = gender, 
    dob = dob, 
    email = email, 
    phone_num = phone_num, 
    street_address_1 = street_address_1, 
    street_address_2 = street_address_2, 
    city = city, 
    state = state, 
    country = country, 
    zip_code = zip_code
WHERE person_id = person_id

----- DELETE -----
-- There is no DELETE for this table, as the community wants to keep data integrity for past matches


---------------
-- locations --
---------------
----- CREATE -----
INSERT INTO locations(table_qty, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code, type_of_address, location_name, notes)
VALUES (table_qty, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code, type_of_address, location_name, notes)

----- READ -----
-- Get all data
SELECT * from locations;

----- UPDATE -----
UPDATE locations 
SET table_qty = table_qty, 
    email = email, 
    phone_num = phone_num, 
    street_address_1 = street_address_1, 
    street_address_2 = street_address_2, 
    city = city, 
    state = state, 
    country = country, 
    zip_code = zip_code 
    type_of_address = type_of_address, 
    location_name = location_name, 
    notes = notes

----- DELETE -----
-- There is no DELETE for this table, as the community wants to keep data integrity for past matches


-------------
-- matches --
-------------
----- CREATE -----


----- READ -----
-- Get all data
SELECT * from matches;

----- UPDATE -----


----- DELETE -----



----------
-- sets --
----------
----- CREATE -----


----- READ -----
-- Get all data
SELECT * from sets;

----- UPDATE -----


----- DELETE -----



-----------
-- games --
-----------
----- CREATE -----


----- READ -----
-- Get all data
SELECT * from games;

----- UPDATE -----


----- DELETE -----



---------------------
-- match_officials --
---------------------
----- CREATE -----


----- READ -----
-- Get all data
SELECT * from match_officials;

----- UPDATE -----


----- DELETE -----



--------------------
-- player_matches --
--------------------
----- CREATE -----


----- READ -----
-- Get all data
SELECT * from player_matches;

----- UPDATE -----


----- DELETE -----



----------------------
-- people_locations --
----------------------
----- CREATE -----


----- READ -----
-- Get all data
SELECT * from people_locations;

----- UPDATE -----


----- DELETE -----