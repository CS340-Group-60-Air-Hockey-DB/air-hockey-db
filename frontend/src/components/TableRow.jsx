import DeleteBtn from './DeleteBtn';

const TableRow = ({ rowObject, objectId, backendURL, deleteBtn, refreshData, onEdit, editDisabled, hiddenColumns = [] }) => {
    const visibleColumns = Object.keys(rowObject).filter(colName => !hiddenColumns.includes(colName));

    return (
        <tr>
            {visibleColumns.map((colName, index) => (
                <td key={index}>{rowObject[colName]}</td>
            ))}
            
            {(deleteBtn || onEdit) && (
                <td style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {onEdit && (
                        <button 
                            disabled={editDisabled}
                            onClick={onEdit}
                        >
                            Edit
                        </button>
                    )}

                    {deleteBtn && (
                        <DeleteBtn 
                            rowObject={rowObject}
                            objectId={objectId} 
                            backendURL={backendURL} 
                            refreshData={refreshData}
                        />
                    )}
                </td>
            )}
        </tr>
    );
}
export default TableRow;