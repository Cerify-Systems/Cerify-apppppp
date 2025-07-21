import React from 'react';
import team from "./team.png";
import Marker from "../../Images/MarkerAbout.png";
import { Link } from 'react-router-dom';


function About() {
  return (
    <div className="text-center w-full mt-2 bg-[#fbfaf9]">
      <div className="flex flex-col ">
        <h1 className='text-3xl md:text-4xl lg:text-5xl w-full w-3/4 lg:w-2/3 mx-auto font-semibold tracking-wide'>
          Save time and get your contracts verified with <span className='text-[#0a4fd7]'> our AI based platform </span>
        </h1>
        <img src={Marker} className="w-2/5 mt-[10px] mb-5 mx-auto" alt="Marker" />
        <p className='text-[#6d6d6d] text-lg md:text-xl lg:text-2xl'>The simplest way to get your contracts verified? That’s us.</p>
        <img src={team} alt="Team working" className="h-auto w-3/4 md:w-2/3 lg:w-1/2 rounded-lg mx-auto mt-8" />
        <h1 className='w-full md:w-3/4 lg:w-2/3 text-2xl md:text-4xl lg:text-5xl text-center mx-auto mt-8 font-semibold mb-4'>
          <span className='text-[#0a4fd7]'>The reasons why we stand out </span>
        </h1>
        <p className='text-[#6d6d6d] text-lg md:text-xl lg:text-2xl'>A platform to empower blockchain while using business as a force for good.</p>
      </div>
    </div>
  );
}

export default About;