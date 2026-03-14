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

        const safe_email = email === '' ? null : email
        const safe_note = note === "" ? null : note;

        const query = `CALL sp_add_location(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @insertId, @error_message);
                        SELECT @insertId, @error_message;`;

        const values = [
            table_qty, safe_email, phone_num, street_address_1, street_address_2,
            city, state, country, zip_code, type_of_address, location_name, safe_note
        ];

        const [result] = await db.query(query, values);

        if (result[1][0]['@error_message'] !== null) {
            const message = result[1][0]['@error_message'] && result[1][0]['@error_message'].includes('unique_address')
                ? 'The location provided is already taken. Either update that location or provide another address.' : 'There was an error adding the location.'

            return res.status(400).json({
                error: result[1][0]['@error_message'],
                message
            })
        }

        const newLocationId = result[1][0]['@insertId'];

        // insert junction table record if owner was selected
        if (person_id) {
            const query2 = `
                INSERT INTO people_locations (person_id, location_id)
                VALUES (?, ?);
            `

            await db.query(query2, [person_id, newLocationId]);
        }

        res.status(201).json({ message: "Location created successfully!", id: result.insertId });

    } catch (error) {
        if (error.sqlState === '23000') {
            if (error.sqlMessage?.includes('people_locations')) {
                return res.status(400).json({
                    error,
                    message: 'The person already owns that location. Either update the location owner or provide a different owner.'
                })
            }
        }
        res.status(500).json({
            error,
            message: "Failed to create location"
        });
    }
};

const update_location = async (req, res) => {
    const { id } = req.params;
    const {
        table_qty, email, phone_num, street_address_1, street_address_2,
        city, state, country, zip_code, type_of_address, location_name, note, person_id
    } = req.body;

    let message
    let result

    // Updating the locations table
    try {
        const safe_address_2 = street_address_2 === "" ? null : street_address_2;
        const safe_note = note === "" ? null : note;
        // After : is for when person_id = 'no owner'
        // To make it null instead of NaN
        const safe_person_id = person_id === '' ? null : parseInt(person_id) || null

        const query = `CALL sp_update_location(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @rows_affected, @error_message);
                        SELECT @rows_affected, @error_message;`;

        const values = [
            table_qty, email, phone_num, street_address_1, safe_address_2,
            city, state, country, zip_code, type_of_address, location_name, safe_note, id, safe_person_id
        ];

        [result] = await db.query(query, values);

        if (result[1][0]['@error_message'] !== null) {
            if (result[1][0]['@error_message'].includes('unique_address')) {
                message = 'The location provided is already taken. Either update that location or provide another address.'

                return res.status(400).json({
                    error: result[1][0]['@error_message'],
                    message
                })
            }
            else if (result[1][0]['@error_message'].includes('email')) {
                message = 'The email provided is already taken. Please provide another email address.'

                return res.status(400).json({
                    error: result[1][0]['@error_message'],
                    message
                })
            }
            else {
                return res.status(400).json({
                    error: result[1][0]['@error_message'],
                    message: 'There was an error updating the location.'
                })
            }
        }

        res.status(200).json({ message: "Location updated successfully!" });
    }
    catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({
            error,
            message: "Failed to update location"
        });
    }
};


module.exports = {
    get_all_locations,
    create_location,
    update_location
}