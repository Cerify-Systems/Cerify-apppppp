import React, { useState } from 'react';
import './AddFile.css'; 
import { Link, useNavigate } from 'react-router-dom';
import Navbar2 from '../../Components/Navbar2';
import Add from "../../Images/add-image.png";
import Upload from "../../Images/upload.png";
import Navbar3 from '../../Components/Navbar3';

import { app, db, auth } from '../Pages/firebase'; 
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firestore = getFirestore(app);
const storage = getStorage(app);

function AddFile() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

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

  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.name.endsWith('.sol') && !selectedFile.name.endsWith('.txt')) {
        alert('Please select a .sol or .txt file');
        return;
      }
      // Validate file size (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    }
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const uploadFile = async (userId) => {
    const fileRef = ref(storage, `users/${userId}/documents/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const analyzeContract = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Analysis failed');
    }

    return await response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    
    if (!user) {
      console.log('No user is logged in');
      return;
    }
    
    const userId = user.uid; 
    console.log('User ID:', userId);
    
    if (!file && !url) {
      alert('Please upload a file or provide a URL.');
      return;
    }

    setIsUploading(true);

    try {
      let documentData = {};
      let analysisResult = null;

      if (file) {
        // First, analyze the contract with the backend
        console.log('Analyzing contract...');
        const analysisResponse = await analyzeContract(file);
        analysisResult = analysisResponse.result;
        
        // Store analysis result for the Score component
        localStorage.setItem('analysisResult', JSON.stringify(analysisResult));
        
        // Upload file to Firebase storage
        const fileUrl = await uploadFile(userId);
        
        documentData = {
          name: file.name,
          url: fileUrl,
          uploadedDate: new Date(),
          lastAccessed: new Date(),
          status: 'Analyzed', 
          score: analysisResult.score,
          vulnerabilities: analysisResult.vulnerabilities,
          issues: analysisResult.issues,
          lines: analysisResult.lines,
          assignedTo: 'xyz',
        };
        
        // Save document data to Firebase
        await addDocumentForUser(documentData);
        
        // Navigate to upload progress page
        navigate('/Upload');
        
      } else if (url) {
        // For URL-based analysis
        const response = await fetch('http://localhost:5000/analyze-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        if (response.ok) {
          const data = await response.json();
          analysisResult = data.result;
          localStorage.setItem('analysisResult', JSON.stringify(analysisResult));
          
          documentData = {
            name: 'Document from URL',
            url: url,
            uploadedDate: new Date(),
            lastAccessed: new Date(),
            status: 'URL Analyzed', 
            score: analysisResult.score,
            vulnerabilities: analysisResult.vulnerabilities,
            issues: analysisResult.issues,
            lines: analysisResult.lines,
          };
          
          await addDocumentForUser(documentData);
          navigate('/Upload');
        } else {
          throw new Error('URL analysis failed');
        }
      }

      setFile(null);
      setUrl('');
      
    } catch (error) {
      console.error('Error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="px-4 md:px-8">
      
      <main className='pt-2'>
        <h1 className='md:text-3xl text-2xl font-medium mb-1 '>Add a file name</h1>
        <Navbar3/>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 mx-auto w-[60vw] md:w-[40vw] lg:w-[30vw]">
            <label htmlFor="file-upload-add-file" className="block cursor-pointer file-upload-label-home">
              <div className="border-dashed border-2 border-gray-300 bg-gray-100 p-5 flex flex-col items-center gap-2 rounded-lg text-black">
                <span className='text-blue-600 underline text-sm md:text-base mb-1'>
                  {file ? file.name : 'Upload your contract'}
                </span>
                <span className='text-sm text-gray-600 mb-1'>or drag and drop <br></br></span>
                <span className='text-xs font-extrabold text-gray-500'>SOL or TXT up to 5MB</span>
              </div>
              <input
                id="file-upload-add-file"
                type="file"
                accept=".sol, .txt"
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />
            </label>
            <div className="flex items-center my-8">
              <hr className="flex-grow border-t border-black"></hr>
              <span className="px-4 text-sm font-light text-black">OR</span>
              <hr className="flex-grow border-t border-black" />
            </div>
            <input
              type="text"
              placeholder="Paste contract URL"
              value={url}
              onChange={handleUrlChange}
              className="w-full bg-transparent p-1 border-b border-black mb-12"
              disabled={isUploading}
            />

              <button
                type="submit"
                className="bg-blue-700 inline-flex justify-center items-center text-white w-full text-lg font-bold p-2.5 border-none rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
                <img src={Upload} alt="upload-icon" className="w-8 ml-2" />
              </button>
            </div>
        </form>
      </main>
    </div>
  );
}

export default AddFile;
