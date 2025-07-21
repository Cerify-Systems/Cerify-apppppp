import React, { useState } from 'react';
import './Profile.css';
import Navbar4 from '../../Components/Navbar4';
import profilepic from '../../Images/profilepic.png';
import Image1 from '../../Images/Image1.png';
import { Link, useNavigate } from 'react-router-dom';
// import Chatbot from './Chatbot';
import AddFile from '../Pages/AddFile';
import Help from "../Pages/Help";
import Ask from '../../Images/ask.png';
import SidePanel from '../../Components/SidePanel2';
import About from '../Pages/About';
import FFaq from '../Pages/FFaq';
import BP from '../Pages/BusinessPlan2';
import Profilepic from '../../Images/profilepic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus, faBars} from '@fortawesome/free-solid-svg-icons';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Flex, Card } from "rebass";
import { db } from './firebase';
import { doc, getDoc, collection, getDocs} from 'firebase/firestore';
import { useEffect } from 'react';


const contentMapProfile = {
  'About': About,
  'FFaq': FFaq ,
  'Help': Help,
  'BP': BP,
};
function Profile({ user }) {
  const [isBOpen, setIsBOpen] = useState(false);
  const [sPBContent, setSPBContent] = useState('');
  const [userData, setUserData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const getUserData = async (uid) => {
    const userDocRef = doc(db, 'users', uid); 
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log("User Data:", userDoc.data());
      setUserData(userDoc.data());
    } else {
      console.log("No such document!");
    }
  };

  const getDocumentData = async (uid) => {
    const documentsCollectionRef = collection(db, 'users', uid, 'documents'); // Replace 'documents' with your actual sub-collection name
    const documentSnapshot = await getDocs(documentsCollectionRef);
    const documentData = documentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Documents Data:", documentData);
    setDocuments(documentData);
  };

  useEffect(() => {
    if (user) {
      const uid = user.uid; 
      getUserData(uid);
      getDocumentData(uid);
    }
  }, [user]);


  const handleSPBClick = (content) => {
    setSPBContent(contentMapProfile[content]);
    setIsBOpen(true);
  };

  const closeBPanel = () => {
    setIsBOpen(false);
  };

  const handleBClick = (event, doc) => {
    console.log("Button clicked");
    event.preventDefault();
    console.log("Navigating to BusinessPlan with document:", doc);
    navigate('/businessPlan2', { state: { document: doc } });
  };


  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);

  const handleUploadNewClick = (e) => {
    e.preventDefault();
    setIsSidePanelOpen(true);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };
  const handleHelpClick = (e) => {
    e.preventDefault();
    setHelpOpen(true);
  };

  const closeHelp = () => {
    setHelpOpen(false);
  };


  return (
    <div className="profile min-h-screen flex flex-col bg-whitesmoke">
      <Navbar4 onLinkClick={handleSPBClick}/>
      <div className='MainProfile flex-1 flex flex-col mx-4 w-[95%]'>
        <header className="profile-header border-b-2 p-4 flex flex-col md:flex-row  justify-between ">
          <div className='ProfileandPic flex  w-full block'>
            <img src={profilepic} alt="Profile" className=' w-16 h-16 md:w-24 md:h-24 rounded-full' />
            <div className='flex flex-col ml-4'>
              <h1 className='text-xl md:text-2xl'>{userData?.firstName}</h1>
              <div className=" profile-details mt-2">
                <span className='text-lg md:text-xl '>{documents.length} contracts</span>
                {/* <span className='bg-white px-2 rounded-full text-blue-800'>2 under review</span> */}
                <span className='text-lg md:text-xl '>India</span>
              </div>
            </div>
          </div>
          <div className='filterandupgrade h-10 w-full  md:flex-row-reverse flex mt-4 md:mt-0 '>
            <a href="/admind" className='FilterProfile flex items-center md:p-6 p-5 '><FontAwesomeIcon icon={faBars} className=' hidden md:inline mr-2'/>Filter</a>
            <a href="/AddFile" className='UploadNewProfile flex items-center md:p-6 p-5' onClick={handleUploadNewClick}><FontAwesomeIcon icon={faPlus} className='mr-2 hidden md:inline' />Upload new</a>
          </div>

        </header>
        
        <div className="flex flex-wrap  gap-2 px-4">
  {documents.length > 0 ? (
    documents.map((doc) => (
      <div key={doc.id} className="contract-card  bg-white shadow-md rounded-lg  mb-4 sm:w-1/3 md:w-1/3 lg:w-1/5 ">
        <button onClick={(e) => handleBClick(e, doc)}>
          <img src={Image1} alt={doc.name} className="contract-image w-full h-32 object-cover mb-2 rounded" />
        </button>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{doc.name}</h2>
          <div>
            <Card id="container" style={{ width: 70, height: 50, paddingLeft: 0 }}>
              <Card sx={{ width: 80 }}>
                <div className="progressbar-container">
                  <CircularProgressbar
                    value={doc.score * 10}
                    circleRatio={0.6}
                    strokeWidth={11}
                    className="custom-progressbar"
                    styles={buildStyles({
                      rotation: 0.7,
                      pathColor: doc.score > 5 ? 'green' : 'rgb(225,5,5)',
                    })}
                  />
                  <h5 style={{ color: doc.score > 5 ? 'green' : 'rgb(225,5,5)' }} className={`score-in-circle w-8 relative right-9 ${doc.status.toLowerCase().replace(' ', '-')}`}>
                    {doc.score}
                  </h5>
                </div>
              </Card>
            </Card>
          </div>
        </div>
        <div className="flex gap-2 md:border-b-[1px] md:pb-2 border-black mb-2">
          <img src={profilepic} alt="Uploaded by" className="h-6 rounded-full" />
          <p>{doc.uploadedBy}</p>
          <p className="ml-2 border-l-2 border-dotted pl-4">Uploaded {doc.uploadedDate?.toDate().toDateString()}</p>
        </div>
        <div className="hidden md:flex items-center justify-between">
          <p>Last access: <span className="font-medium">{doc.lastAccessed?.toDate().toDateString()}</span></p>
          <div className="flex items-center">
            <p className={`contract-status ${doc.status.toLowerCase().replace(' ', '-')}`}>{doc.status}</p>
            <div className="dropdown-menu relative">
              <button className="pl-3 focus:outline-none"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
              <div className="dropdown-content absolute hidden bg-white shadow-lg rounded mt-1">
                <a href="#" className='block px-4 py-2 text-sm'>Preview</a>
                <a href="#" className='block px-4 py-2 text-sm'>Download Report</a>
                <a href="#" className='block px-4 py-2 text-sm'>Download Invoice</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className='mx-4'>No documents uploaded.</p>
  )}
</div>
      </div>

      {isSidePanelOpen && (
        <div className="side-panel-AddFile w-[100vw] md:w-[70vw] ls:w-[60vw]  transition duration-300 ease-in-out">
          <div className='flex justify-between p-3'>
          <button className="bg-black text-white text-3xl py-1 px-4 rounded-full" onClick={closeSidePanel}>X</button>
          <a href="/Help" className='border-black border-2 py-2 px-6 rounded-full text-xl mt-1 flex flex-row items-end gap-2' onClick={handleHelpClick}><img src={Ask} alt="" className='h-6' />Help</a>
          </div>
          <hr />
          <div><AddFile></AddFile></div>
        </div>
      )}
      {isHelpOpen && (
        <div className="side-panel-Help transition md:w-[70vw] w-[100vw] duration-300 ease-in-out">
          <div><button className="bg-black text-white text-3xl py-2 px-4 mt-2 mb-4 rounded-full " onClick={closeHelp}>X</button>
          {/* <h2>Upload New File</h2> */}
          </div>
          <hr />
          <div><Help></Help></div>
        </div>
      )}
      {/* <SidePanel isOpen={isBOpen} onClose={closeBPanel} content={sPBContent} onLinkClick={handleSPBClick}/> */}

    </div>
  );
}

export default Profile;
