import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-2">
      <summary 
        onClick={toggleAccordion} 
        className='flex justify-between items-end cursor-pointer p-4 pl-2 md:text-base text-sm border-b-[0.1rem] border-[#8c8c8b] list-none text-[#717171] font-[Verdana] hover:bg-[#e7e7e7]'>
        {title}
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
      </summary>
      {isOpen && <p className='p-5 bg-white'>{content}</p>}
    </div>
  );
};

export default AccordionItem;