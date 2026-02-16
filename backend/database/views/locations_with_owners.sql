CREATE
OR REPLACE VIEW locations_with_owners AS
SELECT
    l.location_id,
    l.location_name,
    CONCAT (p.first_name, ' ', p.last_name) as `owner`,
    l.table_qty,
    l.email,
    l.phone_num,
    l.street_address_1,
    l.street_address_2,
    l.city,
    l.state,
    l.country,
    l.zip_code,
    l.type_of_address,
    l.notes
from
    locations as l
    JOIN people_locations as pl on pl.location_id = l.location_id
    INNER JOIN people as p on p.person_id = pl.person_id
ORDER BY
    l.location_name;