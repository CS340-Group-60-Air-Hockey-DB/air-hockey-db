import DeletePersonForm from './DeletePersonForm';

const TableRow = ({ rowObject, backendURL }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeletePersonForm rowObject={rowObject} backendURL={backendURL} />
        </tr>
    );
};

export default TableRow;