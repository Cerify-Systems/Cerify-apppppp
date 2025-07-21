import React from 'react';
// import './FFaq.css';
// import Navbar2 from '../../Components/Navbar';
import Search from "../../Images/glass.png";
import AccordionItem from "../../Components/AccordianItem";  // Import the new AccordionItem component

function FFaq() {
  return (
    <div className="bg-[#fbfaf9] text-center w-full mt-2">
      <div className="mx-auto w-[90%] max-w-4xl bg-transparent  text-left ">
        <div>
          <h1 className='text-3xl md:text-5xl font-[500] font-sans pb-2'>Frequently Asked Questions</h1>
          <p className='text-lg md:text-2xl text-gray-500 font-[Lucida_Sans_Unicode]'>Here are a few topics that would help you navigate Cerify</p>
        </div>
        
        {/* <div className="pt-4 pb-10 pl-2 flex flex-col md:flex-row items-center gap-4">
          <div className="border-r border-gray-400 flex items-center w-full md:w-auto">
            <img src={Search} alt="Search Logo" className="w-7 h-auto" />
            <input type="text" className="flex-1 pl-2 py-2 border-none bg-transparent" placeholder="Search" />
          </div>
          <div className="flex flex-wrap justify-start gap-4 items-start text-[#9ca1a5]">
            {["General", "Contracts", "Data Sharing", "Verification", "Certification"].map((item) => (
              <a 
                key={item} 
                href={`#${item.replace(" ", "")}`} 
                className="pt-1 pb-1 px-3 rounded-lg text-[#c6c3c3] no-underline hover:bg-[#3dfe90] hover:text-black hover:rounded-md"
              >
                {item}
              </a>
            ))}
          </div>
        </div> */}

        <div className="md:pt-4 p-0 bg-red">
          {["GENERAL", "CONTRACTS"].map((section) => (
            <div key={section} className="text-left  text-sm md:text-base">
              {/* <h3 className='md:text-lg font-bold mt-2 md:mb-6 font-[Verdana]'>{section}</h3> */}
              {section === "GENERAL" && (
                <>
                  <AccordionItem title="How does Cerify work?" content="This is the content of section 1."  />
                  <AccordionItem title="How is the company working?" content="This is the content of section 2." />
                  <AccordionItem title="What all should I follow uploading an IP?" content="This is the content of section 3." />
                </>
              )}
              {section === "CONTRACTS" && (
                <>
                  <AccordionItem title="What all contracts can I upload?" content="This is the content of section 1." />
                  <AccordionItem title="What all formats can the contracts be?" content="This is the content of section 2." />
                  <AccordionItem title="What all should I follow uploading an IP?" content="This is the content of section 3." />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FFaq;