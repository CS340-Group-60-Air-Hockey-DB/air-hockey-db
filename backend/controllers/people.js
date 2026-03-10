// Database
const db = require('../database/db-connector');
const people_queries = require('../database/queries/people')

const add_person = async (req, res) => {
    const { first_name, last_name, gender, dob, email, phone_num,
        street_address_1, street_address_2, city, state,
        country, zip_code } = req.body

    const sp_query = `CALL sp_add_person (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @person_id, @error_message);
                        SELECT @person_id, @error_message;`

    const values = [first_name, last_name, gender, dob, email, phone_num, street_address_1, street_address_2, city, state, country, zip_code]

    try {
        const add_res = await db.query(sp_query, values);

        if (add_res[0][1][0]['@error_message'] !== null) {
            return res.status(400).json({
                message: `There was an error with adding the person.`,
                error: add_res[0][1][0]['@error_message']
            })
        }

        return res.status(201).json({
            message: "Person added successfully",
            person_id: add_res[0][1][0]['@person_id']
        });
    }
    catch (error) {
        if (error.sqlState === "45000") {
            return res.status(400).json({
                message: `An error occurred while adding the person due to the request body.`,
                error
            })
        }

        return res.status(500).send({
            message: "An error occurred while adding the person.",
            error
        });
    }
}


const get_all_people = async (req, res) => {
    try {
        const query1 = people_queries.select_all
        const [people] = await db.query(query1);

        res.status(200).json(people);

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }

}


module.exports = {
    add_person,
    get_all_people
}