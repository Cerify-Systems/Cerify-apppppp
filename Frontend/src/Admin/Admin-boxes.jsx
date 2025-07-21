import React, { useState, useEffect } from 'react';
import "./Admin-boxes.css";
import Cerify from "./Cerify.png";
import Navbar4 from '../Components/Navbar4';
import { Link } from 'react-router-dom';
// import Navbar4 from '../Components/Navbar4';
import { app } from '../Routes/Pages/firebase';
import { getFirestore } from 'firebase/firestore';
import menu1 from '../Images/menu.png';
import menu2 from '../Images/interface.png';
import upload1 from '../Images/upload1.png';
import download from '../Images/download.png';
import down from '../Images/down.png';
import sliders from '../Images/sliders.png';
import filecode from '../Images/Image1.png';
import { collection, addDoc ,getDocs} from 'firebase/firestore';
import { db, auth } from '../Routes/Pages/firebase';

const firestore =getFirestore(app);
const addDocumentForUser = async (docData) => {
  const user = auth.currentUser;

  if (!user) {
    console.log('No user is logged in');
    return;
  }

  const userId = user.uid; 
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/documents`), docData);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const handleAddDocument = () => {
  const documentData = {
    name: 'My First Document',
    content: 'This is some sample content',
    timestamp: new Date(),
  };

  addDocumentForUser(documentData);
};

const fetchDocumentsForUser = async () => {
  const user = auth.currentUser;

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
      // return documentsData;
    });
    console.log('Fetched documents: ', documentsData);
    console.log('Fetched documents:');

    return documentsData; // Return the fetched documents
  } catch (e) {
    console.error('Error fetching documents: ', e);
  }
};

function Adminb() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [auditRequests, setAuditRequests] = useState(9);
  const [serviceRequests, setServiceRequests] = useState(2);

  useEffect(() => {
    const getDocuments = async () => {
      const docs = await fetchDocumentsForUser();
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

  return (
    <div className="app-container min-h-screen bg-whitesmoke">
        <Navbar4 />
      <main className="app-main">
        <section className="app-section">
          <div className='navbar-admin-all-documnents hidden  md:flex'>
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
            <div className="app-stat items-center border-gray-400 border-l-2 ">
              <span className='text-lg ml-10'>+</span>
              <button onClick={handleAddDocument} > &nbsp;Add New</button>
            </div>
          </div>
          </div>
          <div className='secondline-admin-audit md:flex block gap-5 '>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Documents... "
          />
          <div className='secondline-buttons gap-2 mt-5 md:mt-0 md:gap-4 inline justify-evenly'>
            <div className='menu md:gap-4'><a href=""><img src={menu1} className="menu1-image"/></a><img src={menu2} className="menu2-image"/></div>
            <div className='shareanddownload md:gap-4'><a href="" className='sharelink mr-2'><img src={upload1} className="upload-image hidden md:inline"/>Share</a>
            <a href="" className='downloadlink md:gap-4 mr-2  '><img src={download} className="upload-image hidden md:inline "/>Download<img src={down} className="upload-image hidden md:inline"/></a></div>
            <div className='filterlink ' ><a href="" className='downloadlink'><img src={sliders} className="upload-image hidden md:inline"/>Filter</a></div> 
          </div>
          </div>
          <div className="app-documents flex flex-wrap gap-4 mt-5">
  {filteredDocuments.map((doc) => (
    <div key={doc.id} className="app-document bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 border border-gray-300 rounded shadow-md">
      <img src={filecode} alt="image" className='codesimage' />
      <h3 className="mt-0">{doc.name}</h3>
      <p>Uploaded: {doc.uploadedDate?.toDate()?.toLocaleDateString() || 'N/A'}</p>
      <p>Last Accessed: {doc.lastAccessed?.toDate()?.toLocaleDateString() || 'N/A'}</p>
      <p>Status: {doc.status}</p>
      <button className="app-btn bg-blue-500 text-white rounded px-4 py-2 mt-2">View</button>
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