import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import About from '../Routes/Pages/About';
import FAQ from '../Routes/Pages/FFaq';
import Help from '../Routes/Pages/Help';
import Cerify from "../Images/Cerify.png";
// import { Link } from 'react-router-dom';

const Navbar = ({ onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);

  const handleLinkClick = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
    setIsOpen(true); // Open the panel when a link is clicked

  };

  const closePage = () => {
    setCurrentPage(null);
    setIsOpen(false); // Close the panel
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className='nav flex flex-col md:flex-row justify-between items-center font-sans p-4'>
      <div className='flex md:w-auto w-full justify-between'>
      <Link to="/">
      <img src={Cerify} alt="Cerify Logo" className="h-12 mr-auto" />
      </Link>
    
      {/* Hamburger Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
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

      {/* Main Content Area */}
      <div className={`fixed inset-0  bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>

          
    {/* Sidebar Menu */}
    <div className={`fixed top-0  right-0 w-64 h-full z-2 bg-[#fbfaf9] shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <ul className='flex flex-col p-4'>
        <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3 '>
          <Link to="/About" onClick={(e) => handleLinkClick(e, 'About')} className=' block'>&nbsp;&nbsp; About &nbsp;&nbsp;</Link>
        </li>
        <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
          <Link to="/FFaq" onClick={(e) => handleLinkClick(e, 'FFaq')} className=' block'>&nbsp;&nbsp; FAQ &nbsp;&nbsp;</Link>
        </li>
        <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
          <Link to="/Help" onClick={(e) => handleLinkClick(e, 'Help')} className=' block'>&nbsp;&nbsp; Help &nbsp;&nbsp;</Link>
        </li>
        <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
          <Link to="/Signup" className="signup block" >&nbsp; Sign up &nbsp;</Link>
        </li>
        <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-[#0a4fd7] hover:text-white rounded-lg py-2.5 px-3'>
          <Link to="/Login" className="login  block">&nbsp; Login &nbsp;</Link>
        </li>
      </ul>
    </div>



      {/* Sliding Panel for Pages */}
      <div className={`fixed top-0 right-0 min-h-screen z-3 bg-[#fbfaf9] shadow-lg transform transition-transform duration-300 ease-in-out ${currentPage ? 'md:w-7/12 w-full' : 'hidden'}  ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:w-7/12 w-full`}>
      {/* flex-1 transition-all duration-300 ${currentPage ? 'md:w-7/12 w-full' : 'hidden'} */}
        <div className=" px-4 py-2 ">
          <button onClick={closePage} className="p-2 text-gray-500 focus:outline-none ">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          {currentPage === 'About' && <About onClose={closePage} />}
          {currentPage === 'FFaq' && <FAQ onClose={closePage} />}
          {currentPage === 'Help' && <Help onClose={closePage} />}
        </div>
      </div>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex list-none gap-8'>
        <div className='flex gap-1.5 bg-blue-100 p-1 rounded-lg '>
          <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/About" onClick={(e) => handleLinkClick(e, 'About')}>&nbsp;&nbsp; About &nbsp;&nbsp;</Link>
          </li>
          <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/FFaq" onClick={(e) => handleLinkClick(e, 'FFaq')}>&nbsp;&nbsp; FAQ &nbsp;&nbsp;</Link>
          </li>
          <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/Help" onClick={(e) => handleLinkClick(e, 'Help')}>&nbsp;&nbsp; Help &nbsp;&nbsp;</Link>
          </li>
        </div>
        <div className='flex gap-1.5 bg-blue-100 p-1 rounded-lg'>
        <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/Signup" className="signup">&nbsp; Sign up &nbsp;</Link>
          </li>
          <li className='text-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 hover:text-white rounded-lg py-2.5 px-3'>
            <Link to="/Login" className="login">&nbsp; Login &nbsp;</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
