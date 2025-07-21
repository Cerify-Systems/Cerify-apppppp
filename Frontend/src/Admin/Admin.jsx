import React, { useState } from 'react';
import Cerify from "./Cerify.png";
import Navbar4 from '../Components/Navbar4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usflag from '../Images/us-flag.png';
import canada from '../Images/canada.png';
import german from '../Images/german.png';
import mexico from '../Images/mexico.png';
import france from '../Images/france.png';
import BarChart from './BarChart';
import { faHandshakeAngle, faClockRotateLeft, faCheck, faChartSimple, faUsers, faSliders, faChartLine, faChevronRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Admin({ user }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const certification = [
    { title: 'Business documents', count: 70, percent: 18 },
    { title: 'Blockchain', count: 67, percent: 8 },
    { title: 'NFT', count: 56, percent: 1 },
    { title: 'Finance', count: 40, percent: 9 },
    { title: 'Accounting', count: 39, percent: 80 },
  ];

  const activity = [
    { time: '2 mins ago', name1: 'Jane Cooper ', description: 'application', name2: 'International Business Management' },
    { time: '3 hrs ago', name1: 'Raj Gaurav', description: "added 3 documents to", name2: 'Guy Hawkins' },
    { time: '1 day ago', name1: 'Raj Gaurav', description: "added 3 documents to", name2: 'Guy Hawkins' },
    { time: '3 days ago', name1: 'International Business Management', description: "updated", name2: 'Proposal' },
    { time: '3 days ago', name1: 'Raj Gaurav', description: "added 3 documents to", name2: 'Guy Hawkins' },
  ];

  const breakdown = [
    { title: 'Yet to audit', count: 2, percent: 8 },
    { title: 'Approved', count: 130, percent: 18 },
    { title: 'Corrections', count: 11, percent: 22 },
  ];

  const documents = [
    { count: '3k', flag: `${usflag}`, },
    { count: '1.5k', flag: `${canada}`, },
    { count: '2.5k', flag: `${german}`, },
    { count: '1k', flag: `${mexico}`, },
    { count: '1k', flag: `${france}`, },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-whitesmoke">
      <Navbar4 />
      <main className="flex-grow m-auto w-[92%]">
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col w-full">
              <div className="pb-8">
                <h2 className="text-lg">Welcome,</h2>
                <h1 className="text-4xl mb-4 font-medium">{user.displayName}</h1>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* <div className="date-range bg-white  rounded border border-solid border-gray-300 flex items-center">
                    <span className="datestart pr-3 border-r border-solid border-gray-300">01 Mar 2024</span>
                    <span className="ml-3">30 Apr 2024</span>
                  </div> */}
                  {/* <div className="w-[1px] bg-gray-300"></div> */}
                  <div className="actions flex gap-5">
                    <button className="border border-solid p-[0.3rem] border-blue-600 bg-blue-100 rounded cursor-pointer font-medium text-blue-600">Overview</button>
                    <button className="border border-solid p-[0.3rem] border-blue-600 bg-blue-100 rounded cursor-pointer font-medium text-blue-600">Revenue</button>
                    <button className="border border-solid p-[0.3rem] border-blue-600 bg-blue-100 rounded cursor-pointer font-medium text-blue-600">Applications                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col gap-6 w-full lg:w-1/2">
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <div className='flex justify-between items-center pb-3'>
                      <h3 className='text-lg'>Overall Reviews</h3>
                      <span className='text-xl md:text-3xl lg:text-4xl font-bold'>480</span>
                    </div>

                    <div className="flex h-2 w-full bg-gray-200">
                      <div className="h-full w-[40%] bg-purple-400"></div>
                      <div className="h-full w-[10%] bg-pink-400"></div>
                      <div className="h-full w-[50%] bg-blue-500"></div>
                    </div>
                    <div className="flex justify-around mt-5">
                      <div className="flex flex-col">
                        <span className='text-purple-400'><FontAwesomeIcon icon={faHandshakeAngle} style={{ color: "#998dd9" }} />&nbsp;To Pick up</span>
                        <span className='font-bold text-[rgb(0, 0, 0)] text-xl md:text-2xl lg:text-4xl'>162</span>
                      </div>
                      <div className='w-[1.5px] bg-blue-600'></div>
                      <div className="flex flex-col">
                        <span className='text-pink-400'><FontAwesomeIcon icon={faClockRotateLeft} style={{ color: "#ff8492" }} />&nbsp;Overdue</span>
                        <span className='font-bold text-[rgb(0, 0, 0)] text-xl md:text-2xl lg:text-4xl'>17</span>
                      </div>
                      <div className='w-[1px] bg-blue-600'></div>
                      <div className="flex flex-col">
                        <span className='text-blue-500'><FontAwesomeIcon icon={faCheck} />&nbsp;Completed</span>
                        <span className='font-bold text-[rgb(0, 0, 0)] text-xl md:text-2xl lg:text-4xl'>301</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <div className='font-medium flex justify-between pb-2'>
                      <h3 className='text-base md:text-xl lf:text-2xl'>Application Breakdown</h3>
                      <button className="px-2 border border-gray-200 bg-white rounded cursor-pointer font-medium flex gap-2 items-center">See all<FontAwesomeIcon icon={faChevronRight} className='pl-2' /></button>
                    </div>
                    <div className="flex mb-2.5">
                      <span className='text-xl md:text-2xl lg:text-4xl'>128</span>
                      <span className='p-2  ml-4 text-green-700 bg-green-100 rounded-xl flex gap-2 items-center'><FontAwesomeIcon icon={faArrowUp} />10 This month</span>
                    </div>
                    <ul className='list-none p-0 m-0'>
                      {breakdown.map((item, index) => (
                        <li key={index} className='flex justify-between border-b-2 border-gray-300 items-center'>
                          <span className='w-[60%] text-base font-medium p-2' style={{ backgroundColor: item.title === 'Approved' ? 'rgb(219, 248, 213)' : item.title === 'Corrections' ? 'rgb(255, 231, 223)' : 'transparent' }}>
                            <FontAwesomeIcon icon={faChartSimple} />&nbsp;{item.title}
                          </span>
                          <div className='flex gap-4'>
                            <span className='text-xl font-extrabold text-gray-600'>{item.count}</span>
                            <span className='w-12 flex gap-2 items-center text-[rgb(2, 152, 149) ]'><FontAwesomeIcon icon={faArrowUp} />{item.percent}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col justify-evenly gap-6 w-full lg:w-1/2">
                <div className="bg-[#dff8f9] px-5 py-2 rounded-lg shadow-md">
                    <div className='flex justify-between font-medium'>
                      <h1 className='text-[rgb(100,158,179)] text-xl'>Top asks for certification</h1>
                      <button className="p-1 border border-gray-200 bg-white rounded cursor-pointer font-medium flex gap-2 items-center">See all<FontAwesomeIcon icon={faChevronRight} /></button>
                    </div>
                    {certification.map((cert, index) => (
                      <ul key={index} className='list-none p-0 m-0'>
                        <li className="flex justify-between py-0.5 border-b-[1px] border-gray-300 items-center">
                          <span className='w-[40%] text-sm md:text-base  font-medium'>{cert.title}</span>
                          <div className='flex gap-12'>
                            <span className='font-bold text-base md:text-xl text-gray-600'>{cert.count}</span>
                            <span className='w-12 flex gap-2 items-center text-[rgb(2,152,149)]'><FontAwesomeIcon icon={faArrowUp} />{cert.percent}</span>
                          </div>
                        </li>
                      </ul>
                    ))}
                  </div>

                  <div className="documents-card flex flex-col px-4 py-1 rounded-lg shadow-md ">
                    <div className='flex justify-between'>
                      <h3 className='text-purple-800 text-base md:text-xl'>Documents from</h3>
                      <button className="px-2 border border-gray-200 bg-white rounded cursor-pointer font-medium flex gap-2 items-center">See all<FontAwesomeIcon icon={faChevronRight} /></button>
                    </div>
                    <BarChart />
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-feed-card justify-between border-b-[1px] border-gray-300 pt-5 px-5 bg-white rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 md:ml-2 max-sm:mt-2">
              <div className='flex items-center justify-between pb-2'>
                <h2 className='text-xl'><FontAwesomeIcon icon={faUsers} className='pr-2' />Activity feed</h2>
                <FontAwesomeIcon icon={faSliders} />
              </div>
              <div className="border-2 inline-block px-2 rounded-full">NEW (2)</div>
              {activity.map((act, index) => (
                <ul key={index} className='list-none p-0 m-0'>
                  <li className="font-medium flex flex-col justify-between border-b-2 py-2 border-gray-300 my-3">
                    <span className='flex gap-3 items-center text-gray-500'><FontAwesomeIcon icon={faChartLine} className='text-blue-600' />{act.time}</span>
                    <span className='text-gray-500'>{act.name1} <span className='text-black'>{act.description}</span></span>
                    <span className='text-gray-500 pb-1'>{act.name2}</span>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;