import React, {useState} from 'react'
import "./navbar3.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Download from "../Images/downloadAddFile.png";
import Setting from "../Images/settings.png";
import Checkmark from "../Images/checkmark.png";
import { FaRegCalendar, FaEye, FaUser, FaClock, FaComment, FaComments } from 'react-icons/fa';
import AssignWork from '../Routes/Pages/AssignWork';



const Navbar3 = () => {
    

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('File:', file);
    console.log('URL:', url);
  };

  const handleAssignClick = () => {
    setShowAssignPopup(true);
  };
  
  const closePopup = () => {
    setShowAssignPopup(false);
  };

  return (
    <div className='nav3'> 
        <div className='flex gap-8 p-3'>
        <Link to="/About" className='flex flex-col'><FaRegCalendar alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Add Due Date &nbsp;&nbsp; </Link>
        <Link to="/About" className='flex flex-col'><FaEye alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Preview Report &nbsp;&nbsp; </Link>
        <Link to="/About" className='flex flex-col'><img src={Download} alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Download &nbsp;&nbsp; </Link>
        </div>
          <div className='flex gap-8 p-[0.7rem]'>
            {showAssignPopup && <AssignWork closePopup={closePopup} />}
            <button onClick={handleAssignClick} className='auditRl rounded-full flex flex-row border-gray-400 border-2 p-3' ><FaUser alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Assign &nbsp;&nbsp; </button>  
              {showAssignPopup && <AssignWork closePopup={closePopup} />}
          <Link to="/AuditRequest" className=' rounded-full flex flex-row border-gray-400 border-2 p-3 ' ><FaClock alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Activity History &nbsp;&nbsp; </Link>   
          <Link to="/AuditRequest" className='rounded-full flex flex-row border-gray-400 border-2 p-3 ' ><FaComments alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Comments &nbsp;&nbsp; </Link>   
          
          </div>
         
    </div>
  )
}

export default Navbar3
