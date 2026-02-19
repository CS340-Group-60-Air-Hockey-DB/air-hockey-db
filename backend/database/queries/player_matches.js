const player_match_queries = {
    delete_by_id: `
        DELETE FROM player_matches
        WHERE player_match_id = :player_match_id;
    `,
    select_all: `
        SELECT pm.match_id,
            CONCAT(p.first_name, ' ', p.last_name) as "player_name",
            CONCAT(p_opp.first_name, ' ', p_opp.last_name) as "opponent",
            pm.player_order,
            pm.starting_side
        from player_matches as pm
        JOIN people as p on p.person_id = pm.player_id
        JOIN player_matches as pm_opp on pm_opp.match_id = pm.match_id
            AND pm_opp.player_id != pm.player_id
        JOIN people as p_opp on pm_opp.player_id = p_opp.person_id
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
    insert_player_match: `
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