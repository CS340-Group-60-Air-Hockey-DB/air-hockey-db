# Citation for use of AI Tools

**Date:** 02/23/2026

**AI Source URL:** claude.ai

**Notes:** The result of memoization will be used in the other table pages as well.

**Prompt used to generate table mapping:**

How would you modify this code to make it more efficient? My thinking is that mapping 2 arrays isn't efficient and can be time + computatively exhausting. Is there a way to simplify it to only map once?

```javascript
<table className="data-table">
    <thead>
        <tr>
            {
                games?.length > 0 && Object.keys(games[0])?.map((header, idx) => {
                    let h = header            
                                
                    if(header === 'match_id'){
                        h = 'match'
                    }
                    if(header === 'set_id'){
                        h = 'set_num'
                    }
                    if(header === 'game_num'){
                        h = 'game_number'
                    }

                    return (
                        <th key={`${header}-${idx}`}>
                            { cap_words(h) }
                        </th>
                    )
                })
            }
            
            { games?.length > 0 && 
                <th>
                    Actions
                </th>    
            }
        </tr>
    </thead>
    <tbody>
        {games.map((game, idx) => {
            let game_row = game
            delete game_row.game_id

            game_row.start_datetime = game.start_datetime ? new Date(game.start_datetime).toLocaleDateString(locale, { 
                hour: "numeric",
                minute: "numeric"
            }) : null
                            
            game_row.end_datetime = game.end_datetime ? new Date(game.end_datetime).toLocaleDateString(locale, {
                hour: "numeric",
                minute: "numeric"
            }) : null

            return <TableRow 
                key={`game-${idx}`} 
                rowObject={game_row} 
                backendURL={backendURL} 
                deleteBtn={true}
            />
        })}
    </tbody>
</table>
```