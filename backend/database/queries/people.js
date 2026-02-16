const people_queries = {
    select_all: 'SELECT * from people ORDER BY first_name;',
    get_by_id: 'SELECT * from people WHERE person_id = : person_id;'
}

export default people_queries