import React from 'react'
import "./navbar3.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Download from "../Images/downloadAddFile.png";
import Setting from "../Images/settings.png";
import Checkmark from "../Images/checkmark.png";
// import Cerify from "../Images/Cerify.png"



const Navbar3 = () => {
  return (
    <div className='nav3'> 
        <div className='p-3'>
            <Link to="/AuditRequest" className='auditR ' ><img src={Checkmark} alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Audit Request &nbsp;&nbsp; </Link>   
        </div>
          <div className='flex p-[0.7rem]'>
          <Link to="/About" className='flex flex-col'><img src={Download} alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Download &nbsp;&nbsp; </Link>
            <Link to="/FFaq" className='flex flex-col'><img src={Setting} alt="" className="h-4 mb-1 mx-auto " />  <h5 className='mt-1'>&nbsp;&nbsp; Settings &nbsp;&nbsp;</h5></Link>
          </div>
         
    </div>
  )
}

export default Navbar3
