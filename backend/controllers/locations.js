// Database
const db = require('../database/db-connector');
const location_queries = require('../database/queries/locations')
const create_locations_with_owners = require('../database/views/locations_with_owners.js')


const get_all_locations = async (req, res) => {
    try {
        // Create locations_with_owners View
        await db.query(create_locations_with_owners)

        const [locations] = await db.query(location_queries.select_all);

        res.status(200).json(locations);

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }

}

const create_location = async (req, res) => {
    try {
        const {
            table_qty, email, phone_num, street_address_1, street_address_2,
            city, state, country, zip_code, type_of_address, location_name, note, person_id
        } = req.body;

        const safe_address_2 = street_address_2 === "" ? null : street_address_2;
        const safe_note = note === "" ? null : note;

        const query = `CALL sp_add_location(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            table_qty, email, phone_num, street_address_1, safe_address_2,
            city, state, country, zip_code, type_of_address, location_name, safe_note
        ];

        const [result] = await db.query(query, values);
        const newLocationId = result.insertId;

        // insert junction table record if owner was selected
        if (person_id) {
            const query2 = `
                INSERT INTO people_locations (person_id, location_id)
                VALUES (?, ?);
            `

            await db.query(query2, [person_id, newLocationId]);
        }

        res.status(201).json({ message: "Location created successfully!", id: result.insertId});

    } catch (error) {
        console.error("Error creating location:", error);
        res.status(500).json({ error: "Failed to create location" });
    }
};

const update_location = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            table_qty, email, phone_num, street_address_1, street_address_2, 
            city, state, country, zip_code, type_of_address, location_name, note, person_id
        } = req.body;

        const safe_address_2 = street_address_2 === "" ? null : street_address_2;
        const safe_note = note === "" ? null : note;

        const query = `CALL sp_update_location(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            table_qty, email, phone_num, street_address_1, safe_address_2, 
            city, state, country, zip_code, type_of_address, location_name, safe_note, id
        ];

        await db.query(query, values);

        const deleteJunctionQuery = `DELETE FROM people_locations WHERE location_id = ?`;
        await db.query(deleteJunctionQuery, [id]);

        if (person_id && person_id !== "") {
            const insertJunctionQuery = `
                INSERT INTO people_locations (person_id, location_id)
                VALUES (?, ?);
            `;
            await db.query(insertJunctionQuery, [person_id, id]);
        }

        res.status(200).json({ message: "Location updated successfully!" });

    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ error: "Failed to update location" });
    }
};


module.exports = {
    get_all_locations,
    create_location,
    update_location
}