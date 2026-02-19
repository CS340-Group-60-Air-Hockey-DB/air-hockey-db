import DeleteBtn from './DeleteBtn';

const TableRow = ({ rowObject, backendURL, deleteBtn }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            {
                deleteBtn && <DeleteBtn rowObject={rowObject} backendURL={backendURL} />
            }
        </tr>
    );
};

export default TableRow;