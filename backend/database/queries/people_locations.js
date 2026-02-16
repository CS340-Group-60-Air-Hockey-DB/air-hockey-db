const people_location_queries = {
    delete_by_ids: `
        DELETE FROM people_locations
        WHERE person_id = :person_id AND
            location_id = :location_id;
    `,
    insert_person_location: `
        INSERT INTO people_locations(person_id, location_id)
        VALUES (:person_id, :location_id);
    `,
    update_by_id: `
        UPDATE people_locations
        SET person_id = :update_person_id,
            location_id = :update_location_id
        WHERE person_id = :curr_person_id AND
            location_id = :curr_location_id;
    `,
}

module.exports = people_location_queries