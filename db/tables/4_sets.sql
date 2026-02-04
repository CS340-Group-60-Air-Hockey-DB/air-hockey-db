CREATE OR REPLACE TABLE sets (
    set_id int(11) auto_increment not null unique,
    match_id int(11) not null,
    winner_id int(11),
    set_num tinyint(4) not null,
    start_datetime datetime,
    end_datetime datetime,
    set_status enum ('scheduled', 'in_progress', 'completed', 'abandoned') not NULL default 'scheduled',

    primary key (set_id),

    foreign key (match_id) references matches(match_id),
    foreign key (winner_id) references people(person_id),

    constraint chk_set_num check (set_num between 1 and 7),
    constraint chk_match_times check (
        end_datetime IS NULL OR 
        end_datetime > start_datetime
    ),
    constraint chk_winner check (
            set_status = 'completed' AND 
            winner_id IS NOT NULL AND 
            set_num between 2 and 7
    ),
    constraint unique_match_set UNIQUE (match_id, set_num)

    -- Needed Constraints left (via API Endpoint Function Check or a Database Trigger):
        -- - A set must contain at least 4 games when completed
        -- - set_num cannot exceed the parent match's set_max value
);