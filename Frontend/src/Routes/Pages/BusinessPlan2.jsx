import React, { useState } from 'react';
import './BusinessPlan2.css'; 
import { Link,useLocation  } from 'react-router-dom';
import Navbar2 from '../../Components/Navbar2';
import Chatbot from './Chatbot';
import Add from "../../Images/add-image.png"
import Upload from "../../Images/upload.png"
// import Navbar3 from '../../Components/Navbar3';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Flex, Card } from "rebass";
import './Score.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import AccordionItem from "../../Components/AccordianItem2";
import profilepic from '../../Images/profilepic.png'; 
import code from "../../Images/Image1.png";
// import React from 'react'
// import "./navbar3.css";

import Download from "../../Images/downloadAddFile.png";
import Setting from "../../Images/settings.png";
import Checkmark from "../../Images/checkmark.png";
import Down from "../../Images/down.png";
function BP() {
  const location = useLocation();
  const { document } = location.state || {}; 

  if (!document) {
    return <p>No document selected.</p>; 
  }

  const totalValue = 10;
  const CustomText = () => (
    <div className="custom-text2-9-user top-[41%] left-[49%] md:top-[51%]">
      <span className="text-5xl leading-none font-verdana scoretext-user" >{document.score}</span>
      <span className="text-xl leading-none font-monospace totaltext-user" >/ {totalValue}</span>
    </div>
  );

  return (
    <div className="add-file-user slide-in">
      <main className='main-add-file-user px-4 md:px-16 pt-6'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className=' block w-full'>
          <h1 className='text-3xl md:text-5xl mt-2 md:mb-4'>{document.name}</h1>
                <div className='flex flex-row gap-3 '>  
                  <img src={profilepic} alt="Login Illustration" className='h-5' />
                  <span className='text-sm'>Rohan Jacob</span>
                  <span className='text-sm'>Uploaded on 24Feb</span>
                </div>
        </div>
          <img src={code} alt="Login Illustration" className='h-[6rem] hidden md:inline' />
          </div>
          <div className='nav3 md:mb-5'> 
        <div className='p-1 flex gap-2'>
        <Link to="/Profile" className='auditR ' > &nbsp;&nbsp; Back &nbsp;&nbsp; </Link>    
            <Link to="/AuditRequest" className='auditR ' ><img src={Checkmark} alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Audit Request &nbsp;&nbsp; </Link>  
            
        </div>
          <div className='flex p-1'>
          <Link to="" className='flex flex-col'><img src={Download} alt="" className="h-6 mx-auto" /> &nbsp;&nbsp; Download &nbsp;&nbsp; </Link>
            <Link to="" className='flex flex-col'><img src={Setting} alt="" className="h-4 mb-1 mx-auto " />  <h5 className='mt-1'>&nbsp;&nbsp; Settings &nbsp;&nbsp;</h5></Link>
          </div>
         
    </div>
        <div className="score-box-user mx-auto my-4 max-w-xs sticky">
        <div className="App-user">
          <Card id="container-user" style={{ width: 300, height: 200, paddingLeft: 0 }}>
            <Card sx={{ height: 70, width: 260 }}>
              <div className="progressbar-container2-user ">
                <CircularProgressbar
                  value={document.score*10}
                  // text={<CustomText />}
                  circleRatio={0.6}
                  strokeWidth={9}
                  className="custom-progressbar2-user"
                  styles={buildStyles({
                    rotation: 0.7,
                    pathColor: '#0a4fd7'
                  })}
                />
                 <CustomText />
              </div>
            </Card>
          </Card>
          <hr className='horizontalline-user'/>
        </div>
        <div className="score-details-user">
          <div className="score-pass-user">
            <span className='tick-user'><FontAwesomeIcon icon={faCircleCheck} /></span>
            <span>06 / 13 works</span>
          </div>
          <div className="score-fail-user">
            <span className='cross-user'><FontAwesomeIcon icon={faCircleXmark} /></span>
            <span>14 issues found</span>
          </div>
        </div>
        
      </div>
        <div className="mt-4">
          <div className="text-left mb-12">
            <h3 className='md:text-lg text-base mb-6 font-bold font-verdana'>WHAT WORKS</h3>
            <AccordionItem title="Plagriasm check" content="This is the content of section 1." />
            <AccordionItem title="Clean Code" content="This is the content of section 2." />
            <AccordionItem title="Structure" content="This is the content of section 3." />
          </div>
        </div>
      </main>
    </div>
  );
}

export default BP;