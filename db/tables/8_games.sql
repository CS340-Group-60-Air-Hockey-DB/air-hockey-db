CREATE OR REPLACE TABLE games(
    game_id int auto_increment UNIQUE NOT NULL,
    player_1_id int NOT NULL,
    player_2_id int NOT NULL,
    player_1_score int NOT NULL DEFAULT 0,
    player_2_score int NOT NULL DEFAULT 0,
    winner_id int NOT NULL,
    set_id int,
    game_num int,
    game_status enum ('scheduled', 'in_progress', 'completed', 'abandoned') not NULL default 'scheduled'
    start_datetime datetime,
    end_datetime,

    primary key(game_id),
    foreign key player_1_id references people(person_id),
    foreign key player_2_id references people(person_id),
    foreign key winner_id references people(person_id),
    constraint chk_player_ids CHECK (player_1_id != player_2_id)
    constraint chk_winner_id CHECK (
        winner_id IS NULL OR
        winner_id = player_1_id OR
        winner_id = player_2_id
    )
);