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
            city, state, country, zip_code, type_of_address, location_name, notes
        } = req.body;

        const safe_address_2 = street_address_2 === "" ? null : street_address_2;
        const safe_notes = notes === "" ? null : notes;

        const query = `
            INSERT INTO locations (
                table_qty, email, phone_num, street_address_1, street_address_2,
                city, \`state\`, country, zip_code, type_of_address, location_name, notes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const values = [
            table_qty, email, phone_num, street_address_1, safe_address_2,
            city, state, country, zip_code, type_of_address, location_name, safe_notes
        ];

        const [result] = await db.query(query, values);
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
            city, state, country, zip_code, type_of_address, location_name, notes
        } = req.body;

        const safe_address_2 = street_address_2 === "" ? null : street_address_2;
        const safe_notes = notes === "" ? null : notes;

        const query = `
            UPDATE locations
            SET table_qty = ?, email = ?, phone_num = ?, street_address_1 = ?,
                street_address_2 = ?, city = ?, \`state\` = ?, country = ?,
                zip_code = ?, type_of_address = ?, location_name = ?, notes = ?
            WHERE location_id = ?;
        `;

        const values = [
            table_qty, email, phone_num, street_address_1, safe_address_2, 
            city, state, country, zip_code, type_of_address, location_name, safe_notes, id
        ];

        const [result] = await db.query(query, values);
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