import Link from 'next/link';
import React from 'react';

const Sidebar = ({isOpen, toggleHit}) => {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleSidebar = () => {
    //   setIsOpen(!isOpen);
    // };
    return (
        <div className={`sidebar bg-gray-800 text-white h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <h1 className="text-2xl font-bold"> <Link href={'/'}>DBMS</Link> <button className="text-blue-500 hover:text-red-500"onClick={toggleHit}>X</button></h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="p-4 hover:bg-gray-700 uppercase">
            <Link href={'/tables'}>SHOW Tables</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 uppercase">
          <Link href={'/tables/create'}>Create Table</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 uppercase">
            <a href="#">Show Records</a>
          </li>
          <li className="p-4 hover:bg-gray-700 uppercase">
            <a href="#">Create Records</a>
          </li>
        </ul>
      </nav>
    </div>
    );
};

export default Sidebar;