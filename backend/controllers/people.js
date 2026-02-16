// Database
const db = require('./database/db-connector');


const get_all_people = async (req, res) => {
    try {
        const query1 = `SELECT * FROM people;`;
        const [people] = await db.query(query1);

        res.status(200).json(people);

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }

}


module.exports = {
    get_all_people
}