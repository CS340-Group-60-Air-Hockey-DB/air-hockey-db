const create_matches_with_fks = `
    CREATE OR REPLACE VIEW matches_with_fks AS
    SELECT
        m.match_id,
        l.location_name,
        CONCAT (p.first_name, ' ', p.last_name) as "winner",
        m.start_datetime,
        m.end_datetime,
        m.set_max,
        m.faceoff_type,
        m.match_type,
        m.match_status,
        m.note
    from
        matches as m
        LEFT JOIN locations as l on l.location_id = m.location_id
        LEFT JOIN people as p on p.person_id = m.winner_id
    ORDER BY
        m.start_datetime;`


module.exports = create_matches_with_fks