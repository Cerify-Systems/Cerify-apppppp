import React from 'react'
// import "./Navbar4.css";
import { Link } from 'react-router-dom';
import Cerify from "../Images/Cerify.png";
import Bell from "../Images/bell.png";
import { getAuth,signOut } from 'firebase/auth';
import { app } from '../Routes/Pages/firebase';
import profilepic from "../Images/profilepic.png";
const auth = getAuth(app);

const Navbar = () => {
  return (
    <div className='nav font-sans ml-12 mr-12 mt-4 flex justify-between'> 
          <img src={Cerify} alt="Cerify Logo" className="h-12 mr-auto" />
          <ul className='flex list-none gap-8'>
          <div className='flex gap-1.75 bg-[#e5ebfa] py-3 px-2 rounded gap-3'>
          <li ><Link to="/adminlogin" className='hover:text-white hover:bg-[#0753a4] hover:rounded hover:pt-2.5 hover:pb-2.5 transition ease-in-out duration-300'> &nbsp;&nbsp;Dashboard &nbsp;&nbsp; </Link></li>
          <li><Link to="/adminb" className='hover:text-white hover:bg-[#0753a4] hover:rounded hover:pt-2.5 hover:pb-2.5 transition ease-in-out duration-300'> &nbsp;&nbsp; Contracts &nbsp;&nbsp; </Link></li>
            <li><Link to="/admin" className='hover:text-white hover:bg-[#0753a4] hover:rounded hover:pt-2.5 hover:pb-2.5 transition ease-in-out duration-300'> &nbsp;&nbsp; History   &nbsp;&nbsp;</Link></li>
            {/* <li><a href="/BusinessPlan2">&nbsp;&nbsp; Upgrade &nbsp;&nbsp;</a></li> */}
          </div>
          <div className='flex gap-1.75 bg-[#e5ebfa] py-3 px-2 rounded'>
          
          <li><Link to="/Profile" className="  pr-2 hover:text-white hover:bg-[#0753a4] hover:rounded hover:pt-2.5 hover:pb-2.5 transition ease-in-out duration-300 " >&nbsp; 
          {/* <img src={Bell}  className="bell-logo" />  */}
           &nbsp; Log Out &nbsp;</Link></li>
            {/* <img src={profilepic} alt="Login Illustration" className='h-6 mr-4' /> */}

          {/* <li><Link to="/Login" className="login">&nbsp; Login &nbsp;</Link></li> */}
          
          </div>
            
          </ul>
        </div>
  )
}

export default Navbar
