import { useState } from 'react';
import Sidebar from './Sidebar';


const PrimaryLayout = ({ children }) => {

  const [tables, setTables] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };



  return (
    <>
      <div className="flex">

        {
          isOpen === false ? <button className="bg-gray-800 text-white p-2" onClick={toggleSidebar}>
            {isOpen ? 'Close' : 'Open'} Sidebar
          </button> : <Sidebar isOpen={isOpen} toggleHit={toggleSidebar} />
        }
        {/* Main Content  */}

        <div className="flex-1 p-4">
          {children}

        </div>



      </div>
      {/* Main Content  //*/}

    </>
  );
};

export default PrimaryLayout;
