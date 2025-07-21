import React, { useState } from 'react';
import './AssignWork.css';
import profilepic from '../../Images/profilepic.png';

const AssignWork = ({ closePopup }) => {
  const [assignedTo, setAssignedTo] = useState('Rohan Jacob');
  const [users, setUsers] = useState([
    { name: 'Kathryn Murphy', available: true },
    { name: 'Cameron Williamson', available: true },
    { name: 'Savannah Nguyen', available: true },
    { name: 'Dianne Russell', available: false },
    { name: 'Devon Lane', available: true },
    { name: 'Darrell Steward', available: false },
    { name: 'Guy Hawkins', available: false },
    { name: 'Cameron Williamson', available: true },
  ]);

  const handleAssign = () => {
    // Handle the assignment logic here
    console.log('Assigned work to:', assignedTo);
    closePopup();
  };

  return (
    <div className="assign-work-overlay">
      <div className="assign-work-popup">
        <button className="close-button text-xl" onClick={closePopup}>×</button>
        <h2 className='text-2xl'>Assign work</h2>
        <div className="assigned-to ">
          <span className='text-lg'>Process document</span>
          <div className='flex flex-row gap-3'><span className='text-xs'>ASSIGNED TO</span>  <img src={profilepic} alt="Login Illustration" className='h-4' />
          <span className='text-xs'>{assignedTo}</span></div>
          
        </div>
        <div className="user-list gap-2 flex flex-col">
          {users.map((user, index) => (
            <div className='flex flex-row justify-between'>
            <div key={index} className="user-item ">
              <input
                type="checkbox"
                id={`user-${index}`}
                onChange={() => setAssignedTo(user.name)}
              />
              <label className='flex ' htmlFor={`user-${index}`}>
                {user.name}
              </label>
            </div>
            <div  className= {user.available ? 'available bg-green-100 px-2 py-1 rounded-full' : 'unavailable '}>
                  {user.available ? 'Available' : ''}
                </div>
            </div>
          ))}
        </div>
        <button className="w-full bg-blue-600 py-2 rounded-full text-white" onClick={handleAssign}>Assign now</button>
      </div>
    </div>
  );
};

export default AssignWork;
