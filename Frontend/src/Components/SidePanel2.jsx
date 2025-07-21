import { Link } from 'react-router-dom';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Help from '../Routes/Pages/Help';
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
     
      style={{ width: '50vw' }}
    >
      <div className=" flex justify-between pt-5 pl-5 pr-5 h-[4rem]">
        <button onClick={onClose} className="text-white hover:text-blue-400 focus:outline-none bg-slate-900 pl-2.5 pr-2.5 rounded-full">
          <FaTimes size={24} />
        </button>
        <div className="nav">
        <button className="border-black border-2 py-2 px-6 rounded-full text-xl mt-1 flex flex-row items-end gap-2" onClick={(e) => handleLinkClick(e, 'Help')}>Help</button>
               
            </div>
      </div>
      <hr className='mt-5'/>
      <div className="">
        {content}
      </div>
    </div>
  );
};

export default SidePanel;