import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const AccordionItem2 = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-2">
      <summary 
        onClick={toggleAccordion} 
        className='flex justify-between items-end cursor-pointer p-3 pl-2 text-sm md:text-base lg:text-lg border-b-[0.1rem] border-[#8c8c8b] list-none text-[#717171] font-[Verdana] hover:bg-[#e7e7e7]'>
        {title}
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
      </summary>
      {isOpen && <p className='p-2 bg-white text-sm md:text-base '>{content}</p>}
    </div>
  );
};

export default AccordionItem2;