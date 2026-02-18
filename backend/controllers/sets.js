const db = require('../database/db-connector');
const set_queries = require('../database/queries/sets.js');

const create_set = async (req, res) => {
    try {
        const data = req.body;

        await db.query(set_queries.insert_set, data);

        res.status(201).json(data);

    } catch (error) {
        res.status(500).send("An error occured while executing the database queries.");
    }
}

const get_all_sets = async (req, res) => {
    try {
        const [sets] = await db.query(set_queries.select_all);

        res.status(200).json(sets);

    } catch (error) {
        res.status(500).send("An error occured while executing the database queries.");
    }
}

const get_set_by_id = async (req, res) => {
    try {
        const set_id = req.params.id;

        const [set] = await db.query(set_queries.select_by_id, { set_id });

        if (set.length === 0) {
            return res.status(404).send("Set not found");        
        }

    res.status(200).json(set[0]);

    }   catch (error) {
    res.status(500).send("An error occurred while executing the database queries.");
    }

}

const update_set = async (req, res) => {
    try {
        const data = {
            set_id: req.params.id,
            ...req.body
        };

        await db.query(set_queries.update_by_id, data);

        res.status(200).json({ message: "Update successful"});

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }
}

const delete_set = async (req, res) => {
    try {
        const set_id = req.params.id;

        await db.query(set_queries.delete_by_id, { set_id });

        res.status(204).send()

    } catch (error) {
        res.status(500).send("An error occurred while executing the database queries.");
    }
}

module.exports = {
    create_set,
    get_all_sets,
    get_set_by_id,
    update_set,
    delete_set
}