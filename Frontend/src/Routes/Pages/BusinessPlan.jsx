import React, { useState } from 'react';
import './BusinessPlan.css'; 
import { Link } from 'react-router-dom';
import Navbar2 from '../../Components/Navbar2';
// import Chatbot from './Chatbot';
import Add from "../../Images/add-image.png"
import Upload from "../../Images/upload.png"
import Navbar from '../../Components/Navbar-Business';
// import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import Navbar from '../../Components/Navbar';
import { Flex, Card } from "rebass";
import './Score.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import AccordionItem from "../../Components/AccordianItem2";
import profilepic from '../../Images/profilepic.png'; 
import code from "../../Images/Image1.png";
import AssignWork from './AssignWork';

function AddFile() {
  

const scoreValue = 7.5; 
const totalValue = 10;
const Value = (scoreValue / 10) * 100; 

const CustomText = () => (
  <div className="custom-text2-90-admin">
    <span style={{ fontSize: '2.8rem', lineHeight: '1', fontFamily: 'Verdana' ,className:'scoretext-admin' }}>{scoreValue}</span>
    <span style={{ fontSize: '1rem', lineHeight: '1',fontFamily: 'monospace',className:'totaltext-admin' }}>/ {totalValue}</span>
  </div>
); 
  










  return (
    <div className="add-file-admin slide-in ">
      
      <main className='main-add-file-admin px-16 pt-6 '>
        <div className='flex flex-row justify-between items-center '>
        <div>
          <h1 className='text-5xl mt-2 mb-1'>Business Plan</h1>
                
                  <div className='flex flex-row gap-3'>  
                    <img src={profilepic} alt="Login Illustration" className='h-5' />
                  <span className='text-sm'>Rohan Jacob</span>
                  <span className='text-sm'>Uploaded on 24Feb</span></div>
              
               {/* {showAssignPopup && <AssignWork closePopup={closePopup} />}
              <button className="assign-button" onClick={handleAssignClick}>Assign</button>
              {showAssignPopup && <AssignWork closePopup={closePopup} />} */}
          </div>
          <button className="bg-blue-700 rounded-full text-white px-14 h-[3rem] ">Approve</button>
              
          {/* <img src={code} alt="Login Illustration" className='h-[6rem]' /> */}
          </div>
        
        <Navbar/>
        <div className='flex flex-row  gap-4 pt-3'>
        <img src={code} alt="Login Illustration" className='w-[45vw] h-[70vh] rounded-lg' />
        <div>
        <div className="score-box-admin bg-white rounded-xl  flex w-[45vw] ">
        <div className="App-admin ">
          <Card id="container-admin" style={{  width:[`25vw`], padding:30, paddingLeft:70 }}>
            <Card sx={{ height:[`20vh`],  width: 200 }}>
              <div className="">
                <CircularProgressbar
                  value={Value}
                  circleRatio={0.6}
                  strokeWidth={9}
                  className="custom-progressbar2-admin"
                  styles={buildStyles({
                    rotation: 0.7,
                    pathColor: '#0a4fd7'
                  })}
                />
                <CustomText />                
              </div>
            </Card>
          </Card>
          {/* <hr className=''/> */}
        </div>
        <div className="score-details-admin flex flex-col ">
          <div className="score-pass-admin">
            <span className='tick-admin'><FontAwesomeIcon icon={faCircleCheck} /></span>
            <span>06 / 13 works</span>
          </div>
          <div className="score-fail-admin">
            <span className='cross-admin'><FontAwesomeIcon icon={faCircleXmark} /></span>
            <span>14 issues found</span>
          </div>
        </div>
        
      </div>
      



              <div className="mt-10">
          <div className="text-left ">
            <h3 className='text-[0.9rem]  font-bold font-[Verdana]'>Summary Panel</h3>
            <AccordionItem title="Plagriasm check" content="This is the content of section 1." />
            <AccordionItem title="Clean Code" content="This is the content of section 2." />
            <AccordionItem title="Structure" content="This is the content of section 3." />
          </div>
        </div>
        </div>
                  </div>

      </main>
      {/* <Chatbot /> */}
    </div>
  );
}

export default AddFile;