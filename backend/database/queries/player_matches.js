const player_match_queries = {
    delete_by_id: `
        DELETE FROM player_matches
        WHERE player_match_id = :player_match_id;
    `,
    select_all: `
        SELECT * from player_matches
        ORDER BY match_id;
    `,
    select_by_player_id: `
        SELECT * from player_matches
        WHERE player_id = :person_id
        ORDER BY match_id;
    `,
    select_by_match_id: `
        SELECT * from player_matches
        WHERE match_id = :match_id
        ORDER BY match_id;
    `,
    insert_official: `
        INSERT INTO player_matches(player_id, match_id, starting_side, player_order)
        VALUES (:player_id, :match_id, :starting_side, :player_order);
    `,
    update_by_id: `
        UPDATE player_matches
        SET player_id = :player_id,
            match_id = :match_id,
            starting_side = :starting_side,
            player_order = :player_order
        WHERE player_match_id = :player_match_id;
    `,
}

module.exports = player_match_queries