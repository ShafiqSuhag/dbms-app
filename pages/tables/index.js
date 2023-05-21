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
      <h1>Tables</h1>
      <ul>
        {tables.map((table) => (
            <Link   key={table} href={`tables/${table}`} ><li>{table}</li></Link>
          
        ))}
      </ul>
      
    </div>
  );
};

export default TablesPage;
