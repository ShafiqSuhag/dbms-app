import Link from 'next/link';
import { useState } from 'react';
import PrimaryLayout from '../../Components/Layout/PrimaryLayout';

const CreateTablePage = () => {
    const [tableName, setTableName] = useState('');
    const [columns, setColumns] = useState([{ name: '', type: '', length: '' }]);
    const handleTableNameChange = (event) => {
        setTableName(event.target.value);
    };

    const handleColumnNameChange = (index, event) => {
        const updatedColumns = [...columns];
        updatedColumns[index].name = event.target.value;
        setColumns(updatedColumns);
    };

    const handleColumnTypeChange = (index, event) => {
        const updatedColumns = [...columns];
        updatedColumns[index].type = event.target.value;
        setColumns(updatedColumns);
    };

    const handleColumnLengthChange = (index, event) => {
        const updatedColumns = [...columns];
        updatedColumns[index].length = event.target.value;
        setColumns(updatedColumns);
    };

    // const handleColumnDefaultValueChange = (index, event) => {
    //     const updatedColumns = [...columns];
    //     updatedColumns[index].defaultValue = event.target.value;
    //     setColumns(updatedColumns);
    // };

    const renderColumnTypeOptions = () => {
        return columnTypes.map((type) => (
            <option key={type} value={type}>
                {type}
            </option>
        ));
    };

    const columnTypes = [
        'INT',
        'VARCHAR',
        'TEXT',
        'DATE',
        'DATETIME',
        // Add more column types as needed
    ];


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Submit logic here, e.g., send a POST request to create the table
    //     const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    //       id INT PRIMARY KEY AUTO_INCREMENT,
    //       ${columns
    //         .map(
    //           (column) =>
    //             `${column.name} ${column.type}${column.length ? `(${column.length})` : ''}${
    //               column.defaultValue ? ` DEFAULT '${column.defaultValue}'` : ''
    //             }`
    //         )
    //         .join(',\n')}
    //     )`;
    //     // Execute the createTableQuery
    //   };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if the column name "id" is present in the columns array
        const hasIdColumn = columns.some((column) => column.name.toLowerCase() === 'id');

        if (hasIdColumn) {
            // Display a warning or handle the error accordingly
            alert('Cannot create column with name "id"');
            return;
        }


        try {
            const payload = {
                tableName,
                columns,
            };

            const response = await fetch('/api/createTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Request succeeded
                // Handle the response data or perform any other action
                console.log('Table created successfully');
            } else {
                // Request failed
                console.error('Error creating table:', response.statusText);
            }

            // Reset the form
            setTableName('');
            setColumns([]);
        } catch (error) {
            console.error('Error creating table:', error);
            // Handle the error, show an error message, etc.
        }
    }

    const handleAddColumn = () => {
        setColumns([...columns, { name: '', type: '' }]);
    };

    const handleRemoveColumn = (index) => {
        const updatedColumns = [...columns];
        updatedColumns.splice(index, 1);
        setColumns(updatedColumns);
    };

    //////////////////////////////////------------

    return (
        <PrimaryLayout>


            <div>
                <h1>Create New Table</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="table-name">Table Name:</label>
                        <input
                            type="text"
                            id="table-name"
                            value={tableName}
                            onChange={handleTableNameChange}
                            required
                        />
                    </div>

                    <h2>Columns</h2>
                    <div disabled style={{ padding: "20px" }}>
                        <label htmlFor="">Primary Column</label>
                        <br />
                        <input
                            disabled
                            type="text"
                            placeholder="id"
                            value={"id"}
                        />
                        <select
                            disabled
                            value={""}
                        >
                            <option value="">int</option>
                        </select>
                        <input
                            disabled
                            type="text"
                            placeholder="Length"
                            value={"11"}
                        />
                    </div>
                    {columns.map((column, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Column Name"
                                value={column.name}
                                onChange={(event) => handleColumnNameChange(index, event)}
                                required
                            />
                            <select
                                value={column.type}
                                onChange={(event) => handleColumnTypeChange(index, event)}
                                required
                            >
                                <option value="">Select Type</option>
                                {renderColumnTypeOptions()}
                            </select>
                            <input
                                type="text"
                                placeholder="Length"
                                value={column.length}
                                onChange={(event) => handleColumnLengthChange(index, event)}
                            />
                            {/* <input
                            type="text"
                            placeholder="Default Value"
                            value={column.defaultValue}
                            onChange={(event) => handleColumnDefaultValueChange(index, event)}
                        /> */}
                            {index !== 0 && (
                                <button type="button" onClick={() => handleRemoveColumn(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button type="button" onClick={handleAddColumn}>
                        Add Column
                    </button>

                    <button type="submit">Create Table</button>
                </form>
                <h3><Link href="/tables"> SEE TABLE LIST  </Link>  </h3>
            </div>
        </PrimaryLayout>
    );
};

export default CreateTablePage;
