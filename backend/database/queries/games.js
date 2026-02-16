const games_queries = {
    delete_by_id: `
        DELETE FROM games
        WHERE game_id = :game_id;
    `,
    select_all: `
        SELECT * from games
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

export default games_queries