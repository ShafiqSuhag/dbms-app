import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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



      {/* Main Content  //*/}
      <ToastContainer />
      </div>

    </>
  );
};

export default PrimaryLayout;
