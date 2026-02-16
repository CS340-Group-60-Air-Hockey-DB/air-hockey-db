const location_queries = {
    select_all: 'SELECT * FROM locations_with_owners ORDER BY location_name;',
    select_by_id: `
        SELECT * FROM locations_with_owners
        WHERE location_id = :location_id;`
    ,
    select_by_person_id: `
        SELECT l.location_id, l.location_name,
            CONCAT(p.first_name, ' ', p.last_name) as "owner",
            l.table_qty, l.email, l.phone_num, l.street_address_1, l.street_address_2,
            l.city, l.state, l.country, l.zip_code, l.type_of_address, l.notes
        from locations as l
        JOIN people_locations as pl on pl.location_id = l.location_id
        INNER JOIN people as p on p.person_id = pl.person_id
        WHERE p.person_id = :person_id
        ORDER BY l.location_name;
    `,
    insert_location: `
        INSERT INTO locations(table_qty, email, phone_num, street_address_1, street_address_2, city, "state", country, zip_code, type_of_address, location_name, notes)
        VALUES (:table_qty, :email, :phone_num, :street_address_1, :street_address_2, :city, :"state", :country, :zip_code, :type_of_address, :location_name, :notes);
    `,
    update_by_id: `
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
    `,

}

module.exports = location_queries