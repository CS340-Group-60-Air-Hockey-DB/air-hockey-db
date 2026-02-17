CREATE OR REPLACE TABLE player_matches(
    player_match_id int(11) NOT NULL auto_increment,
    player_id int(11) NOT NULL,
    match_id int(11) NOT NULL,
    starting_side enum('left', 'right') NOT NULL,
    player_order enum('player_1', 'player_2') NOT NULL,

    primary key (player_match_id),

    foreign key (player_id) references people(person_id) ON DELETE CASCADE,
    foreign key (match_id) references matches(match_id) ON DELETE CASCADE,

    constraint unique_player_match unique (player_id, match_id)
);