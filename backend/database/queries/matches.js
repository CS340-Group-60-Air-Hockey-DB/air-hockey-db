const matches_queries = {
    delete_by_id: `
        DELETE FROM matches
        WHERE match_id = :match_id;
    `,
    select_all: `
        SELECT * from matches
        ORDER BY match_status;
    `,
    select_by_id: `
        SELECT * from matches
        WHERE match_id = :match_id
    `,
    insert_match: `
        INSERT INTO matches(set_max, faceoff_type, start_datetime, end_datetime, location_id, match_type, note, match_status)
        VALUES (:set_max, :faceoff_type, :start_datetime, :end_datetime, :location_id, :match_type, :note, 'scheduled');
    `,
    update_by_id: `
        UPDATE matches
        SET set_max = :set_max,
            faceoff_type = :faceoff_type,
            start_datetime = :start_datetime,
            end_datetime = :end_datetime,
            location_id = :location_id,
            match_type = :match_type,
            note = :note,
            match_status = :match_status
        WHERE match_id = :match_id;
    `,
}

export default matches_queries