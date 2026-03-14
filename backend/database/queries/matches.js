const match_queries = {
    delete_by_id: `
        DELETE FROM matches
        WHERE match_id = ?;
    `,
    select_all: `
        SELECT * from matches
        ORDER BY match_status;
    `,
    select_all_view: `
        SELECT * from matches_with_fks
        ORDER BY match_status;
    `,
    select_all_match_locations: `
        SELECT l.location_id, l.location_name FROM matches as m
        INNER JOIN locations as l on l.location_id = m.location_id
        ORDER BY l.location_name;
    `,
    select_all_match_people: `
        SELECT p.person_id, CONCAT(p.first_name, ' ', p.last_name) as "name" FROM matches as m
        INNER JOIN player_matches as pm on pm.match_id = m.match_id 
        INNER JOIN people as p on p.person_id = pm.player_id
        ORDER BY p.first_name;
    `,
    select_by_id: `
        SELECT * from matches
        WHERE match_id = ?;
    `,
    select_sets_by_match_id: `
        SELECT *
        FROM sets
        WHERE match_id = ?
        ORDER BY set_num;
    `,
    select_games_by_match_id: `
        SELECT g.*
        FROM games g
        JOIN sets s ON s.set_id = g.set_id
        WHERE s.match_id = ?
        ORDER BY s.set_num, g.game_num;
    `,
    insert_match: `
        INSERT INTO matches(set_max, faceoff_type, start_datetime, end_datetime, location_id, match_type, note, match_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'scheduled');
    `,
    update_by_id: `
        UPDATE matches
        SET set_max = ?,
            faceoff_type = ?,
            start_datetime = ?,
            end_datetime = ?,
            location_id = ?,
            match_type = ?,
            note = ?,
            match_status = ?
        WHERE match_id = ?;
    `,
}

module.exports = match_queries