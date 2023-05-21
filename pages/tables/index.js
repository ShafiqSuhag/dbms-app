import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from '../../Components/Layout/Sidebar';

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

  return (
    <>
      <div className="flex">
        {/* <button className="bg-gray-800 text-white p-2" onClick={toggleSidebar}>
          {isOpen ? 'Close' : 'Open'} Sidebar
        </button> */}
        {
          isOpen === false ? <button className="bg-gray-800 text-white p-2" onClick={toggleSidebar}>
            {isOpen ? 'Close' : 'Open'} Sidebar
          </button> : <Sidebar isOpen={isOpen} toggleHit={toggleSidebar} />
        }
        {/* Main Content  */}

        <div className="flex-1 p-4">

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

                </tr>
              </thead>
              <tbody>
                {tables.map((table, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b hover:underline"><Link key={table} href={`tables/${table}`} >{table}</Link></td>
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
        </div>


      </div>
      {/* Main Content  //*/}

    </>
  );
};

export default TablesPage;
