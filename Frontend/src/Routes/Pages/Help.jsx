import React from 'react';
import Navbar2 from '../../Components/Navbar2';
import Key from "../../Images/key.png";
import File from "../../Images/file-code.svg";
import Message from "../../Images/message.png";
import HelpImage from "../../Images/HelpImage.png";

const Help = () => {
  return (
    <div className="bg-[#fbfaf9] rounded-xl md:w-3/4 mx-auto  flex flex-col items-center mt-2">
      <div className='main-need-help-container w-full max-w-4xl mx-auto px-4'>
        <h2 className='text-[#333] text-3xl md:text-5xl font-normal font-sans mt-4 md:mb-8 mb-2'>Still Need Help?</h2>
        <p className='explain-help text-[#787878] w-full md:w-3/5 tracking-wider text-lg md:text-xl pb-2 font-trebuchet mb-2 md:mb-8'>Tell us what you have an issue with and we will get back to you</p>
        <p className='first-message block w-1/2 bg-blue-100 p-4 text-sm md:text-base rounded-md text-center '>Good morning! <br/> What can I help you today? Let me know if you have any issue with one of the options below.</p>
        
        <div className="issue-select mt-4 md:mt-8 flex flex-wrap ">
          <div className='p-2 inline-flex text-sm md:text-base rounded-md m-2 border border-[#e6e2e2] items-center'>
            <img src={File} className="file-image w-4 mr-2" alt="File upload issue" />
            File upload issue
          </div>
          <div className='p-2 inline-flex text-sm md:text-base rounded-md m-2 border border-[#e6e2e2] items-center'>
            <img src={Key} className="key-image w-4 mr-2" alt="Login issues" />
            Login issues
          </div>
          <div className='p-2 inline-flex text-sm md:text-base rounded-md m-2 border border-[#e6e2e2] items-center'>
            <img src={HelpImage} className="help-image w-5 mr-2" alt="Help with score documentation" />
            Help me with score documentation
          </div>
          <div className='p-2 inline-flex text-sm md:text-base rounded-md m-2 border border-[#e6e2e2] items-center'>
            <img src={Message} className="message-image w-4 mr-2" alt="General queries" />
            General queries
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
