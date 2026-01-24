CREATE OR REPLACE TABLE games(
    game_id int auto_increment UNIQUE NOT NULL,
    player_1_score int NOT NULL DEFAULT 0,
    player_2_score int NOT NULL DEFAULT 0,
    winner_id int NOT NULL,
    set_id int NOT NULL,
    game_num int,
    game_status enum ('scheduled', 'in_progress', 'completed', 'abandoned') not NULL default 'scheduled',
    start_datetime datetime,
    end_datetime datetime,

    primary key(game_id),
    foreign key winner_id references people(person_id),
    foreign key set_id references sets(set_id),
    constraint chk_player_scores CHECK (
        player_1_score BETWEEN 0 AND 7 AND 
        player_2_score BETWEEN 0 AND 7
    ),
    constraint chk_player_end_scores CHECK (
        game_status = 'completed' AND
        (player_1_score = 7 AND player_2_score < 7) OR 
        (player_1_score < 7 AND player_2_score = 7)
    ),
    constraint chk_winner CHECK (
       (
            game_status = 'completed' AND winner_id IS NOT NULL AND 
            (player_1_score = 7 OR player_2_score = 7)
        ) OR 
       (
            game_status != 'completed' AND winner_id IS NULL AND 
            (player_1_score != 7 AND player_2_score != 7)
       )
    ),
    CONSTRAINT chk_match_times CHECK (
        end_datetime IS NULL OR 
        end_datetime > start_datetime
    ),
);