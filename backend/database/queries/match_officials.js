const match_official_queries = {
    delete_by_id: `
        DELETE FROM match_officials
        WHERE match_official_id = :match_official_id;
    `,
    select_all: `
        SELECT CONCAT(p.first_name, ' ', p.last_name) as name,
            mo.official_type,
            m.match_id as match_num,
            s.set_num
        from match_officials as mo
        JOIN sets as s on s.set_id = mo.set_id
        JOIN matches as m on m.match_id = s.match_id
        JOIN people as p on p.person_id = mo.official_person_id
        ORDER BY mo.set_id;
    `,
    insert_official: `
        INSERT INTO match_officials (official_person_id, set_id, official_type)
        VALUES (:official_person_id, :set_id, :official_type);
    `,
    update_by_id: `
        UPDATE match_officials
        SET official_person_id = :official_person_id,
            set_id = :set_id,
            official_type = :official_type
        WHERE match_official_id = :match_official_id;
    `,
}

module.exports = match_official_queries