const DeleteBtn = ({ rowObject, objectId, backendURL, refreshData }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        
        // get the page we are currently on
        const currentPath = window.location.pathname;
        let idValue = objectId
        
        if(!objectId){
            // get the ID
            const idKey = Object.keys(rowObject)[0];
            idValue = rowObject[idKey];
        }

        if (!window.confirm(`Are you sure you want to delete the row?`)) {
            return;
        }

        try {
            const response = await fetch(`${backendURL}${currentPath}/${idValue}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Deleted successfully!");
                return refreshData()
            } else {
                const error = await response.json();
                console.log('Page URL:', currentPath, '\n\nError Deleting a Row:', error)

                return alert("An error occurred while trying to delete the row. Try again in a minute or two.");
            }
        } catch (error) {
            console.log('Page URL:', currentPath, '\n\nError Deleting a Row:', error)
            return alert("An error occurred while trying to delete the row. Try again in a minute or two.");
        }

    };

    return (
        <td>
            <form onSubmit={handleDelete}>
                <button type='submit'>
                    Delete
                </button>
            </form>
        </td>

    );
};

export default DeleteBtn;