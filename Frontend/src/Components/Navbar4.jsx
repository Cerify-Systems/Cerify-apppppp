import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cerify from "../Images/Cerify.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../Routes/Pages/firebase';
import About from '../Routes/Pages/About';
import FAQ from '../Routes/Pages/FFaq';
import Help from '../Routes/Pages/Help';
const auth = getAuth(app);

const Navbar = ({ onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);

  const handleLinkClick = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
    setIsOpen(true);
  };

  const closePage = () => {
    setCurrentPage(null);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='nav flex flex-col md:flex-row justify-between items-center font-sans p-4 bg-whitesmoke '>
      <div className='flex justify-between w-full'>
        <Link to="/">
          <img src={Cerify} alt="Cerify Logo" className="h-12" />
        </Link>

        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>
      </div>

      <div className={`fixed inset-0  bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>

      {/* Sidebar Menu */}
      <div className={`fixed top-0 right-0 w-64 h-full z-20 bg-[#fbfaf9] shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className='flex flex-col p-4'>
          {/* <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/adminlogin"  className='block'>Admin</Link>
          </li> */}
          <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/admin"  className='block'>Dashboard</Link>
          </li>
          <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/adminb"  className='block'>Documents</Link>
          </li>
          <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/admind" className="signup block">Contracts</Link>
          </li>
          <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/admin" className="login block">Hisory</Link>
          </li>
          <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
          <button onClick={() => signOut(auth)} >
            <LogoutIcon className="mr-1" /> Logout
          </button>
        </li>
        </ul>
      </div>

      <ul className='hidden md:flex list-none gap-8'>
      {/* <li className='flex items-center'>
        <Link to="/adminlogin" className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'> &nbsp;&nbsp;Admin &nbsp; </Link>
        </li> */}
        {/* <li className='flex items-center'>
          <Link to="/adminlogin" className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>Admin</Link>
        </li> */}
        <li className='flex items-center'>
          <Link to="/admin" className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>Dashboard</Link>
        </li>
        <li className='flex items-center'>
          <Link to="/adminb" className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>Documents</Link>
        </li>
        <li className='flex items-center'>
          <Link to="/admind" className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>Contracts</Link>
        </li>
        <li className='flex items-center'>
          <a href="/admin" className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>History</a>
        </li>
        <li className='flex items-center'>
          <button onClick={() => signOut(auth)} className='flex items-center text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>
            <LogoutIcon className="mr-1" /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;