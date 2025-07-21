import React, { useState, useEffect } from 'react';
import "./Admin-boxes.css";
import Cerify from "./Cerify.png";
import Navbar4 from '../Components/Navbar4';
import { Link } from 'react-router-dom';
// import Navbar4 from '../Components/Navbar4';
import menu1 from '../Images/menu.png';
import menu2 from '../Images/interface.png';
import upload1 from '../Images/upload1.png';
import download from '../Images/download.png';
import down from '../Images/down.png';
import sliders from '../Images/sliders.png';
import filecode from '../Images/Image1.png';

function Adminb() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [auditRequests, setAuditRequests] = useState(9);
  const [serviceRequests, setServiceRequests] = useState(2);

  useEffect(() => {
    // Mock data for documents
    const documentsData = [
      {
        id: 1,
        image: filecode,
        name: 'Business Plan',
        uploadedDate: '24 Feb 2024',
        lastAccessed: '4d ago',
        status: 'ASSIGNED',
      },
      {
        id: 2,
        image: filecode,
        name: 'Process Document',
        uploadedDate: '24 Feb 2024',
        lastAccessed: '4d ago',
        status: 'UNDER REVIEW',
      },
      {
        id: 3,
        image: filecode,
        name: 'Blockchain Idea',
        uploadedDate: '24 Feb 2024',
        lastAccessed: '4d ago',
        status: 'UNDER REVIEW',
      },
      {
        id: 4,
        image: filecode,
        name: 'Google Devops',
        uploadedDate: '24 Feb 2024',
        lastAccessed: '4d ago',
        status: 'UNDER REVIEW',
      },
      {
        id: 4,
        image: filecode,
        name: 'Microsoft Arch-Smart Contract',
        uploadedDate: '24 Feb 2024',
        lastAccessed: '4d ago',
        status: 'UNDER REVIEW',
      },
      {
        id: 5,
        image: filecode,
        name: 'DEloitte Idea-Smart COntract',
        uploadedDate: '24 Feb 2024',
        lastAccessed: '4d ago',
        status: 'UNDER REVIEW',
      },
      {
        id: 6,
        image: filecode,
        name: 'Block-Smart Contract',
        uploadedDate: '24 Feb 2024',
        lastAccessed: '4d ago',
        status: 'UNDER REVIEW',
      },
      
    ];

    setDocuments(documentsData);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredDocs = documents.filter((doc) =>
      doc.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDocuments(filteredDocs);
  };

  return (
    <div className="app-container">

        <Navbar4 />
      <main className="app-main">
        <section className="app-section">
          <div className='navbar-admin-all-documnents'>
          <h2>All Documents</h2>
          <div className="app-stats">
            <div className="app-stat">
              <h3>Audit Requests</h3>
              <p>{auditRequests}+</p>
            </div>
            <div className="app-stat">
              <h3>Service Requests</h3>
              <p>{serviceRequests}+</p>
            </div>
          </div>
          </div>
          <div className='secondline-admin-audit'>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search documents"
          />
          <div className='secondline-buttons'>
            <div className='menu'><a href=""><img src={menu1} className="menu1-image"/></a><img src={menu2} className="menu2-image"/></div>
            <div className='shareanddownload'><a href="" className='sharelink'><img src={upload1} className="upload-image"/>Share</a>
            <a href="" className='downloadlink'><img src={download} className="upload-image"/>Download<img src={down} className="upload-image"/></a></div>
            <div className='filterlink' ><a href="" className='downloadlink'><img src={sliders} className="upload-image"/>Filter</a></div>
            
            
          </div>
          </div>
          <div className="app-documents">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="app-document">
                <img src={filecode} alt="image" className='codesimage'/>
                <h3>{doc.name}</h3>
                <p>Uploaded: {doc.uploadedDate}</p>
                <p>Last Accessed: {doc.lastAccessed}</p>
                <p>Status: {doc.status}</p>
                <button className="app-btn">View</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Copyright &copy; 2023 Cerify</p>
      </footer>
    </div>
  );
}

export default Adminb;