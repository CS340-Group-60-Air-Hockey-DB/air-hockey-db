const DeleteBtn = ({ rowObject, backendURL }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        
        // get the page we are currently on
        const currentPath = window.location.pathname;

        // get the ID
        const idKey = Object.keys(rowObject)[0];
        const idValue = rowObject[idKey];

        if (!window.confirm(`Are you sure you want to delete the row?`)) {
            return;
        }

        try {
            const response = await fetch(`${backendURL}${currentPath}/${idValue}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Deleted successfully!");
                window.location.reload();
            } else {
                const error = await response.json();
                console.log('Page URL:', currentPath, '\n\nError Deleting a Row:', error)

                alert("An error occurred while trying to delete the row. Try again in a minute or two.");
            }
        } catch (error) {
            console.log('Page URL:', currentPath, '\n\nError Deleting a Row:', error)
            alert("An error occurred while trying to delete the row. Try again in a minute or two.");
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