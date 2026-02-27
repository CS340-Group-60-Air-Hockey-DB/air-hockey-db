const DeleteBtn = ({ rowObject, backendURL }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        
        // get the page we are currently on
        const currentPath = window.location.pathname;

        // get the ID
        const idKey = Object.keys(rowObject)[0];
        const idValue = rowObject[idKey];

        if (!window.confirm(`Are you sure you want to delete ${idKey} #${idValue}?`)) {
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
                const errorData = await response.json();
                alert("Failed to delete.");
            }
        } catch (error) {
            console.error("Error deleting:", error);
            alert("An error occurred connecting to the server.");
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