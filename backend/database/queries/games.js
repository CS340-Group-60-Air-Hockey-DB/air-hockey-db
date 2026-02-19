const game_queries = {
    delete_by_id: `
        DELETE FROM games
        WHERE game_id = :game_id;
    `,
    select_all: `
        SELECT game_id, m.match_id, g.set_id, game_num, 
            player_1_score, player_2_score, game_status, 
            (
                CASE 
                    WHEN player_1_score = 7 THEN CONCAT(p1.first_name, ' ', p1.last_name)
                    WHEN player_2_score = 7 THEN CONCAT(p2.first_name, ' ', p2.last_name)
                    ELSE NULL
                END
            ) as winner,
            g.start_datetime, g.end_datetime
        from games as g
        JOIN sets as s on s.set_id = g.set_id
        JOIN matches as m on m.match_id = s.match_id
        JOIN player_matches AS pm1 ON pm1.match_id = m.match_id AND pm1.player_order = 'player_1'
        JOIN player_matches AS pm2 ON pm2.match_id = m.match_id AND pm2.player_order = 'player_2'
        JOIN people AS p1 ON p1.person_id = pm1.player_id
        JOIN people AS p2 ON p2.person_id = pm2.player_id
        ORDER BY set_id;
    `,
    select_by_id: `
        SELECT * from games
        WHERE game_id = :game_id
    `,
    insert_game: `
        INSERT INTO games(player_1_score, player_2_score, set_id, game_num, game_status, start_datetime, end_datetime)
        VALUES (:player_1_score, :player_2_score, :set_id, :game_num, :game_status, :start_datetime, :end_datetime);
    `,
    update_by_id: `
        UPDATE games
        SET player_1_score = :player_1_score,
            player_2_score = :player_2_score,
            set_id = :set_id,
            game_num = :game_num,
            game_status = :game_status,
            start_datetime = :start_datetime,
            end_datetime = :end_datetime
        WHERE game_id = :game_id;
    `,
}

module.exports = game_queries