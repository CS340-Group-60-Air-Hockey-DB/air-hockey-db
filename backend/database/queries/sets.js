const set_queries = {
    select_all: `
        SELECT sets.set_id,
            sets.winner_id,
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
    `
}

module.exports = set_queries