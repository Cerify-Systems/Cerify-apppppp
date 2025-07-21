import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../Components/Navbar';
import './Upload.css';

const Upload = () => {
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState('Starting analysis...');

  useEffect(() => {
    // Check if we have analysis results
    const analysisResult = localStorage.getItem('analysisResult');
    
    if (!analysisResult) {
      // No analysis result found, go back to home
      navigate('/');
      return;
    }

    // Simulate analysis progress with realistic steps
    const progressSteps = [
      { progress: 10, status: 'Uploading contract...' },
      { progress: 25, status: 'Parsing Solidity code...' },
      { progress: 40, status: 'Analyzing security patterns...' },
      { progress: 60, status: 'Checking for vulnerabilities...' },
      { progress: 80, status: 'Generating report...' },
      { progress: 100, status: 'Analysis complete!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < progressSteps.length) {
        const step = progressSteps[currentStep];
        setPercentage(step.progress);
        setStatus(step.status);
        currentStep++;
      } else {
        clearInterval(interval);
        // Navigate to score page after a short delay
        setTimeout(() => {
          navigate("/Score"); 
        }, 1000);
      }
    }, 800); // Each step takes 800ms

    return () => clearInterval(interval);
  }, [navigate]);

  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (circumference * percentage / 100);

  return (
    <div className="main">
      <Navbar />
      <div className="upload-container">
        <div className="upload-box">
          <h1>Analyzing your contract</h1>
          <h6>{status}</h6>
          <div className="circle-container-upload">
            <svg width="200" height="200">
              <circle className="circle-background-upload" cx="100" cy="100" r="50" strokeWidth="6" fill="none"  />
              <circle
                className="circle-fill-upload"
                cx="100"
                cy="100"
                r="50"
                strokeWidth="6"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="circle-text-upload">{percentage}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
