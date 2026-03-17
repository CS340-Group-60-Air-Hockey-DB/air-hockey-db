const set_queries = {
    delete_by_id: `
        DELETE FROM sets
        WHERE set_id = ?;
    `,
    select_all: `
        SELECT sets.set_id,
            sets.match_id,
            CONCAT(p.first_name, ' ', p.last_name) as winner, 
            sets.set_num,
            sets.start_datetime, 
            sets.end_datetime,
            sets.set_status as status
        from sets
        LEFT JOIN people as p on p.person_id = sets.winner_id
        ORDER BY sets.match_id, sets.set_num;
    `,
    select_by_id: `
        SELECT * from sets
        WHERE set_id = ?
    `,
    insert_set: `
        INSERT INTO sets(match_id, winner_id, set_num, start_datetime, end_datetime, set_status)
        VALUES (?, ?, ?, ?, ?, ?);
    `,
    update_by_id: `
        UPDATE sets
        SET match_id = ?,
            winner_id = ?,
            set_num = ?,
            start_datetime = ?,
            end_datetime = ?,
            set_status = ?
        WHERE set_id = ?;
    `,
}

module.exports = set_queries