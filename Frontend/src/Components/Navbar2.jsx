import React from 'react';
// import "./Navbar2.css";
import { Link } from 'react-router-dom';
import remove from "../Images/remove.png"



const Navbar = () => {
    return (
      <div className="pt-2">
      <div className='flex justify-between pt-0 pl-5 pr-5 h-[4rem]  '>
            <Link exact to="/"  activeClassName="active">
              <img src={remove} alt="Back" className="h-[3rem]" />
            </Link>
            <div className="nav">
              <ul className='flex list-none gap-8'>
                <div className='flex gap-2 bg-[#cde0f5] pt-3 pl-1 pr-1 pb-3 rounded-md'>
                <li><Link to="/About" className='hover:text-white hover:bg-[#0753a4] text-[#0753a4] rounded-md pt-2 pb-2'> &nbsp;&nbsp; About &nbsp;&nbsp; </Link></li>
                  <li><Link to="/FFaq" className='hover:text-white hover:bg-[#0753a4] text-[#0753a4]  rounded-md pt-2 pb-2'> &nbsp;&nbsp; FAQ &nbsp;&nbsp;</Link></li>
                  <li><a href="Help" className='hover:text-white hover:bg-[#0753a4] text-[#0753a4] rounded-md pt-2 pb-2'>&nbsp;&nbsp; Help &nbsp;&nbsp;</a></li>
                </div>
                <div className='flex gap-2 bg-[#cde0f5] pt-3 pl-1 pr-1 pb-3 rounded-md'>
                  <li><Link to="/Signup" className='hover:text-white hover:bg-[#0753a4] text-[#0753a4]  rounded-md pt-2 pb-2'>&nbsp; Sign up &nbsp;</Link></li>
                  <li><Link to="/Login" className='hover:text-white hover:bg-[#0753a4] text-[#0753a4] rounded-md pt-2 pb-2'>&nbsp; Login &nbsp;</Link></li>
                </div>
              </ul>
            </div>
          </div>
          <div className='w-[100%] h-[0.02rem] bg-gray-400'></div>
    </div>

    )
  }
  
  export default Navbar
  







