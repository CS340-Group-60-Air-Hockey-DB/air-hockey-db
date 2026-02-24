function ResetPopup({setResetPopup}) {
    return (
        <div id="reset-database-popup">
            <p>
                Are you sure you want to reset the database?
            </p>

            <div id="reset-data-btns">
                <button>
                    Yes, Reset the Database
                </button>

                <button>
                    No, Return to the Page
                </button>
            </div>
        </div>
    )
} 

export default ResetPopup