const people_queries = {
    select_all: 'SELECT * from people ORDER BY first_name;',
    select_by_id: 'SELECT * from people WHERE person_id = :person_id;',
    insert_person: `
        INSERT INTO people (first_name, last_name, gender, dob, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code)
        VALUES (:first_name, :last_name, :gender, :dob, :email, :phone_num, :street_address_1, :street_address_2, :city, :state, :country, :zip_code);
    `
    update_by_id: `
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
    `,
}

export default people_queries