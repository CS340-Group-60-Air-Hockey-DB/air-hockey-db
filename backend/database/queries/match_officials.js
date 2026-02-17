const match_official_queries = {
    delete_by_id: `
        DELETE FROM match_officials
        WHERE match_official_id = :match_official_id;
    `,
    select_all: `
        SELECT * from match_officials
        ORDER BY set_id;
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