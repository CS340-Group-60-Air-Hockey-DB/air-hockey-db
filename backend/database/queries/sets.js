const set_queries = {
    delete_by_id: `
        DELETE FROM sets
        WHERE set_id = :set_id;
    `,
    select_all: `
        SELECT match_id,
            CONCAT(p.first_name, ' ', p.last_name) as winner, 
            set_num,
            start_datetime, 
            end_datetime,
            set_status as status
        from sets
        JOIN people as p on p.person_id = sets.winner_id
        ORDER BY match_id;
    `,
    select_by_id: `
        SELECT * from sets
        WHERE set_id = :set_id
    `,
    insert_set: `
        INSERT INTO sets(match_id, winner_id, set_num, start_datetime, end_datetime, set_status)
        VALUES (:match_id, :winner_id, :set_num, :start_datetime, :end_datetime, :set_status);
    `,
    update_by_id: `
        UPDATE sets
        SET match_id = :match_id,
            winner_id = :winner_id,
            set_num = :set_num,
            start_datetime = :start_datetime,
            end_datetime = :end_datetime,
            set_status = :set_status
        WHERE set_id = :set_id;
    `,
}

module.exports = set_queries