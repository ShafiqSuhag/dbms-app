import Link from 'next/link';
import { useEffect, useState } from 'react';
import PrimaryLayout from '../../Components/Layout/PrimaryLayout';

const TablesPage = () => {

  const [tables, setTables] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetch('/api/tables')
      .then((response) => response.json())
      .then((data) => {
        if (data.tables) {
          setTables(data.tables);
        }
      })
      .catch((error) => {
        console.error('Error retrieving tables:', error);
      });
  }, []);

  // const [tables, setTables] = useState([]); // Array to store the table list

  const handleDeleteTable = async (tableName) => {
    console.log("tableId", tableName)


    const confirmDelete = window.confirm('Are you sure you want to delete this table?');
    if (confirmDelete) {
      try {
        // Send a DELETE request to the server-side API endpoint with the table ID
        // const response = await axios.delete(`/api/tables/${tableId}`);
        const response = await fetch(`/api/tables/${tableName}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },

        });


        // Handle the response, such as removing the deleted table from the table list
        setTables(tables.filter((table) => table !== tableName));
      } catch (error) {
        console.error('Error deleting table:', error);
        // Handle the error, show an error message, etc.
      }
    }

  };


  return (
    <>
      <PrimaryLayout>





        <div>
          <div className='px-1 py-5'>
            <h1 className="text-3xl font-bold text-blue-500">
              Table List
            </h1>
            <h5 className="py-1">Total No Of Tables: {tables?.length}</h5>
          </div>


          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b font-medium uppercase text-left">SL</th>
                <th className="py-2 px-4 border-b font-medium uppercase  text-left">Table Name</th>
                <th className="py-2 px-4 border-b font-medium uppercase  text-left">Action</th>

              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b hover:underline"><Link key={table} href={`tables/${table}`} >{table}</Link></td>
                  <td className="py-2 px-4 border-b"><button onClick={() => handleDeleteTable(table)}>Delete</button></td>
                </tr>
              ))}

            </tbody>
          </table>


        </div>

        <div className='px-1 py-5'>
          <h1 className="text-xl font-bold text-gray-500">
            Instruction
          </h1>
          <h5 className="py-1">You can check the table details by clicking on the table name.</h5>
        </div>

      </PrimaryLayout>

    </>
  );
};

export default TablesPage;
