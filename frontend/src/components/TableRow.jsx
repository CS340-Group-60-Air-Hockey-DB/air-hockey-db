import DeleteBtn from './DeleteBtn';

const TableRow = ({ rowObject, backendURL, deleteBtn, refreshData, onEdit, hiddenColumns = [] }) => {
    const visibleColumns = Object.keys(rowObject).filter(colName => !hiddenColumns.includes(colName));

    return (
        <tr>
            {visibleColumns.map((colName, index) => (
                <td key={index}>{rowObject[colName]}</td>
            ))}
            
            {(deleteBtn || onEdit) && (
                <td style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {onEdit && (
                        <button onClick={onEdit}>Edit</button>
                    )}

                    {deleteBtn && (
                        <DeleteBtn 
                            rowObject={rowObject} 
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