import Link from 'next/link';
import { useEffect, useState } from 'react';

const TablesPage = () => {
  const [tables, setTables] = useState([]);

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
    <div>
      <h1 className="text-3xl font-bold underline text-blue-500">
        Tables 1
      </h1>

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
  );
};

export default TablesPage;
