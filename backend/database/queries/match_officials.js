const match_official_queries = {
    select_all: `
        SELECT 
            mo.match_official_id, 
            mo.official_person_id,
            mo.set_id,
            m.match_id,
            CONCAT(p.first_name, ' ', p.last_name) as name,
            mo.official_type,
            m.match_id as match_num,
            s.set_num
        from match_officials as mo
        JOIN sets as s on s.set_id = mo.set_id
        JOIN matches as m on m.match_id = s.match_id
        JOIN people as p on p.person_id = mo.official_person_id
        ORDER BY mo.set_id;
    `
}

module.exports = match_official_queries