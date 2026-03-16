function ResetPopup(props) {
    const { backendURL, refreshData, setResetPopup } = props
    

    const handleResetConfirm = async () => {
        try {
            const response = await fetch(`${backendURL}/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                alert("Air Hockey Database has been successfully reset!");
                refreshData()
                setResetPopup(false)
            } else {
                alert("Failed to reset the database. Please try again.");
            }
        } catch (error) {
            console.error("Error during reset fetch:", error);
            alert("An error occurred while trying to connect to the server.");
        }
    };

    return (
        <div id="reset-database-popup" className="modals">
            <p>
                Are you sure you want to reset the database?
            </p>

            <div id="modal-btn-row">
                <button
                    onClick={evt => {
                        evt.preventDefault() 
                        handleResetConfirm()
                    }}
                >
                    Yes, Reset the Database
                </button>

                <button
                    onClick={evt => {
                        evt.preventDefault() 
                        setResetPopup(false)
                    }}
                >
                    No, Return to the Page
                </button>
            </div>
        </div>
    )
} 

export default ResetPopup