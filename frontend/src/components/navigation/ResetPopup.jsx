function ResetPopup(props) {
    const { setResetPopup } = props

    return (
        <div id="reset-database-popup">
            <p>
                Are you sure you want to reset the database?
            </p>

            <div id="reset-data-btns">
                <button
                    onClick={evt => {
                        evt.preventDefault() 
                        // Add in Stored Procedure Here
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