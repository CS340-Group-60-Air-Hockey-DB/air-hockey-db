const people_location_queries = {
    select_all: `
        SELECT * FROM people_locations;
    `,

    delete_by_ids: `
        DELETE FROM people_locations
        WHERE person_id = ? AND
            location_id = ?;
    `,
    insert_person_location: `
        INSERT INTO people_locations(person_id, location_id)
        VALUES (?, ?);
    `,
    update_by_id: `
        UPDATE people_locations
        SET person_id = ?,
            location_id = ?
        WHERE person_id = ? AND
            location_id = ?;
    `,
}

module.exports = people_location_queries