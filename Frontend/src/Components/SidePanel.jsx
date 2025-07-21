import { Link } from 'react-router-dom';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Help from '../Routes/Pages/Help';
import Navbar from "./Navbar";
    const SidePanel = ({ isOpen, onClose, content, onLinkClick }) => {
        const handleLinkClick = (event, content) => {
            event.preventDefault();
            onLinkClick(content);
          };
          
  return (
    <div
      className={`fixed overflow-y-auto h-full top-0 right-0 bg-[#fbfaf9] transition-transform duration-300 ease-in-out shadow-[0_0px_25px_0px_rgba(0,0,0,0.3)]  ${
        isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}
      // style={{ width: panelWidth }}
      style={{ width: '80vw' }}
    >
      <Navbar onLinkClick={handleLinkClick}/>
      <div className=" flex justify-between pt-5 pl-5 pr-5 h-[4rem]">
        <button onClick={onClose} className="text-white hover:text-blue-400 focus:outline-none bg-slate-900 pl-2.5 pr-2.5 rounded-full">
          <FaTimes size={24} />
        </button>
        <div className="nav">
              <ul className='flex list-none gap-8'>
              <div className='flex gap-1.5  bg-blue-100 p-1 rounded-lg '>
                  <li  className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'><Link to="/About" onClick={(e) => handleLinkClick(e, 'About')}>&nbsp;&nbsp; About &nbsp;&nbsp; </Link> </li>
                  <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'><Link to="/FFaq" onClick={(e) => handleLinkClick(e, 'FFaq')}> &nbsp;&nbsp; FAQ &nbsp;&nbsp;</Link></li>
                  <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'><Link to = "/Help" onClick={(e) => handleLinkClick(e, 'Help')}>&nbsp;&nbsp; Help &nbsp;&nbsp;</Link></li>
                </div>
                <div className='flex gap-1.5 bg-blue-100 p-1 rounded-lg'>
                  <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'><Link to="/Signup" className="signup">&nbsp; Sign up &nbsp;</Link></li>
                  <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'><Link to="/Login" className="login">&nbsp; Login &nbsp;</Link></li>
                </div>
              </ul>
            </div>
      </div>
      <hr className='mt-5'/>
      <div className="p-4">
        {React.isValidElement(content) ? content : null}
      </div>
    </div>
  );
};

export default SidePanel;