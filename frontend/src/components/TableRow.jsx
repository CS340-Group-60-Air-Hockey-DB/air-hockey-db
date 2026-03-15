import DeleteBtn from './DeleteBtn';

const TableRow = ({ rowObject, objectId, backendURL, deleteBtn, refreshData }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            {
                deleteBtn && 
                <DeleteBtn 
                    rowObject={rowObject}
                    objectId={objectId} 
                    backendURL={backendURL} 
                    refreshData={refreshData}
                />
            }
        </tr>
    );
};

export default TableRow;