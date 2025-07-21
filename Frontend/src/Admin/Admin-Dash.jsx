import "../Admin/Admin-Dash.css"; // Keep this if you have other styles not covered by Tailwind
import Navbar5 from '../Components/Navbar4';
import profile from '../Images/profilepic.png';
import menu1 from '../Images/menu.png';
import menu2 from '../Images/interface.png';
import upload1 from '../Images/upload1.png';
import download from '../Images/download.png';
import down from '../Images/down.png';
import sliders from '../Images/sliders.png';
import React, { useState, useEffect } from 'react';
import { app } from '../Routes/Pages/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../Routes/Pages/firebase';
import { Timestamp } from 'firebase/firestore';

// Format the timestamp to a readable string
const formatTimestamp = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleString(); // or any other format
  }
  return timestamp; 
};

function Admind() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const fetchDocumentsForUser  = async () => {
    const user = auth.currentUser ;

    if (!user) {
      console.log('No user is logged in');
      return;
    }

    const userId = user.uid;

    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/documents`));
      console.log('Fetched documents:', querySnapshot.docs);
      const documentsData = [];
      querySnapshot.forEach((doc) => {
        documentsData.push({ id: doc.id, ...doc.data() });
      });
      console.log('Fetched documents: ', documentsData);

      return documentsData; // Return the fetched documents
    } catch (e) {
      console.error('Error fetching documents: ', e);
    }
  };

  useEffect(() => {
    const getDocuments = async () => {
      const docs = await fetchDocumentsForUser ();
      if (docs) {
        setDocuments(docs);
        setFilteredDocuments(docs);
      }
    };

    getDocuments();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredDocs = documents.filter((doc) =>
      doc.name && doc.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDocuments(filteredDocs);
  };

  const handleSelect = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-whitesmoke">
      <Navbar5 />
      <main className="w-[92%] mx-auto">
        <section className="my-8">
          <div className='md:flex justify-between items-center mb-4 hidden'>
            <h2 className="text-2xl">All Documents</h2>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <h3 className="font-semibold">Audit Requests</h3>
                <p>9+</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-semibold">Service Requests</h3>
                <p>2+</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search documents"
              className='border border-gray-300 rounded p-2 w-full md:w-1/3'
            />
            <div className='flex space-x-4 mt-4 md:mt-0'>
              <div className='flex items-center gap-4'>
                <button><img src={menu1} className="w-6" alt="Menu" /></button>
                <img src={menu2} className="w-6" alt="Interface" />
              </div>
              <div className='flex justify-around space-x-2'>
                <button className='flex items-center bg-blue-500 text-white rounded px-4 py-2 md:text-base text-sm'>
                  <img src={upload1} className="w-5 h-5 hidden md:inline" alt="Upload" /> Share
                </button>
                <button className='flex items-center bg-gray-200 rounded px-4 py-2 md:text-base text-sm'>
                  <img src={download} className="w-5 h-5 hidden md:inline" alt="Download" />
                  Download
                  <img src={down} className="w-5 h-5 ml-1" alt="Dropdown" />
                </button>
              </div>
              <button className='flex items-center bg-gray-200 rounded px-4 py-2 md:text-base text-sm'>
                <img src={sliders} className="w-5 h-5 hidden md:inline" alt="Filter" /> Filter
              </button>
            </div>
          </div>
        </section>
        <div className="w-full border-collapse mx-auto">
          <div className="flex border-b bg-gray-100 p-2">
            <div className="flex items-center w-1/6">
              <input
                type="checkbox"
                onChange={() =>
                  setSelectedDocuments(
                    selectedDocuments.length === filteredDocuments.length
                      ? []
                      : filteredDocuments.map((doc) => doc.id)
                  )
                }
                checked={
                  selectedDocuments.length === filteredDocuments.length
                }
              />
              <span className="ml-2">Select all</span>
            </div>
            <div className="flex-1 font-bold">CONTRACT</div>
            <div className="flex-1 font-bold hidden">UPLOADED</div>
            <div className="flex-1 font-bold">SCORE</div>
            <div className="flex-1 font-bold md:inline hidden">STATUS</div>
            <div className="flex-1 font-bold ">ASSIGNED TO</div>
            <div className="flex-1 font-bold  hidden">LAST ACCESS</div>
          </div>
          {filteredDocuments.map((doc) => (
            <div className="flex border-b p-2 items-center" key={doc.id}>
              <div className="flex items-center w-1/6">
                <input
                  type="checkbox"
                  checked={selectedDocuments.includes(doc.id)}
                  onChange={() => handleSelect(doc.id)}
                />
              </div>
              <div className="flex-1">{doc.name}</div>
              <div className="flex-1  hidden">{formatTimestamp(doc.uploadedDate)}</div>
              <div className="flex-1">{doc.score}</div>
              <div className="flex-1 md:inline hidden">{doc.status}</div>
              <div className="flex-1">
                <div className="flex items-center">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span>{doc.assignedTo}</span>
                </div>
              </div>
              <div className="flex-1 hidden ">{formatTimestamp(doc.lastAccessed)}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Admind;