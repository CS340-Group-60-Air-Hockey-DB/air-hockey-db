const people_queries = {
    select_all: 'SELECT * from people ORDER BY first_name;',
    select_by_id: 'SELECT * from people WHERE person_id = ?;',
    insert_person: `
        INSERT INTO people (first_name, last_name, gender, dob, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    update_by_id: `
        UPDATE people
        SET first_name = ?, 
            last_name = ?, 
            gender = ?, 
            dob = ?, 
            email = ?,
            phone_num = ?,
            street_address_1 = ?,
            street_address_2 = ?,
            city = ?,
            "state" = ?,
            country = ?,
            zip_code = ?
        WHERE person_id = ?;
    `,
}

module.exports = people_queries