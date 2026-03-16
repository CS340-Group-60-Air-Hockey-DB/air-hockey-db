import DeleteBtn from './DeleteBtn';

const TableRow = ({ rowObject, backendURL, deleteBtn, refreshData, onEdit }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
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