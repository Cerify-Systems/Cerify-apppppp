import React, {useState, useEffect} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Navbar from '../../Components/Navbar';
import { Flex, Card } from "rebass";
import './Score.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import SidePanel from '../../Components/SidePanel';
import About from '../Pages/About';
import FFaq from '../Pages/FFaq';
import Help from '../Pages/Help';
import { useNavigate } from 'react-router-dom';
import { faCode, faBug, faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const contentMap = {
  'About': About,
  'FFaq': FFaq ,
  'Help': Help,
};

function Score() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get analysis result from localStorage
    const storedResult = localStorage.getItem('analysisResult');
    if (storedResult) {
      try {
        const result = JSON.parse(storedResult);
        setAnalysisResult(result);
      } catch (error) {
        console.error('Error parsing analysis result:', error);
        navigate('/');
      }
    } else {
      // No analysis result found, go back to home
      navigate('/');
    }
  }, [navigate]);

  const handleLinkClick = (content) => {
    setSidePanelContent(contentMap[content]);
    setIsSidePanelOpen(true);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;
    
    // Create a simple text report
    const report = `
Solidity Contract Analysis Report
================================

Score: ${analysisResult.score}/${analysisResult.total}
Vulnerabilities Found: ${analysisResult.vulnerabilities}
Total Issues: ${analysisResult.issues}
Lines of Code: ${analysisResult.lines}
Status: ${analysisResult.status}

Analysis completed on: ${new Date().toLocaleString()}
    `;
    
    // Create and download the file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract-analysis-report.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Use actual analysis result or fallback to default values
  const scoreValue = analysisResult ? analysisResult.score : 7.5;
  const totalValue = analysisResult ? analysisResult.total : 10;
  const vulnerabilities = analysisResult ? analysisResult.vulnerabilities : 2;
  const issues = analysisResult ? analysisResult.issues : 5;
  const Value = (scoreValue / totalValue) * 100;

  const CustomText = () => (
    <div className="custom-text">
      <span style={{ fontSize: '4rem', lineHeight: '1', fontFamily: 'Verdana' ,className:'scoretext' }}>{scoreValue}</span>
      <span style={{ fontSize: '1.5rem', lineHeight: '1',fontFamily: 'monospace',className:'totaltext' }}>/ {totalValue}</span>
    </div>
  );

  if (!analysisResult) {
    return (
      <div className="score-page">
        <Navbar onLinkClick={handleLinkClick} />
        <div className='heading-score'>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="score-page">
      <Navbar onLinkClick={handleLinkClick} />
      <div className='heading-score'>
        <h1>Your score</h1>
        <p>Analysis completed successfully</p>
      </div>
      <div className="score-box">
        <div className="App">
          <Card id="container" style={{ width: 300, height: 250, paddingLeft: 0 }}>
            <Card sx={{ height: 100, width: 300 }}>
              <div className="progressbar-container">
                <CircularProgressbar
                  value={Value}
                  circleRatio={0.6}
                  strokeWidth={11}
                  className="custom-progressbar"
                  styles={buildStyles({
                    rotation: 0.7,
                    pathColor: Value >= 7 ? '#0a4fd7' : Value >= 4 ? '#ffa500' : '#ff0000'
                  })}
                />
                <CustomText />                
              </div>
            </Card>
          </Card>
          <hr className='horizontalline'/>
        </div>
        <div className="score-details">
          <div className="score-pass">
            <span className='tick'><FontAwesomeIcon icon={faCircleCheck} /></span>
            <span>{totalValue - vulnerabilities} / {totalValue} checks passed</span>
          </div>
          <div className="score-fail">
            <span className='cross'><FontAwesomeIcon icon={faCircleXmark} /></span>
            <span>{issues} issues found</span>
          </div>
        </div>
        {/* Improved Stat Cards Section */}
        <div className="stat-cards-row">
          <div className="stat-card stat-code" aria-label="Lines of Code" title="Total lines of code analyzed">
            <FontAwesomeIcon icon={faCode} className="stat-icon" />
            <div className="stat-label">Lines of Code</div>
            <div className="stat-value">{analysisResult.lines}</div>
          </div>
          <div className="stat-card stat-vuln" aria-label="Vulnerabilities" title="Number of vulnerabilities found">
            <FontAwesomeIcon icon={faBug} className="stat-icon" />
            <div className="stat-label">Vulnerabilities</div>
            <div className="stat-value">{vulnerabilities}</div>
          </div>
          <div className={`stat-card stat-status ${analysisResult.status === 'completed' ? 'stat-status-good' : 'stat-status-bad'}`} aria-label="Status" title="Analysis status">
            <FontAwesomeIcon icon={faCheckCircle} className="stat-icon" />
            <div className="stat-label">Status</div>
            <div className="stat-value">{analysisResult.status.charAt(0).toUpperCase() + analysisResult.status.slice(1)}</div>
          </div>
        </div>
        <button className="download-button" onClick={handleDownloadReport}>
          <span>Download report &nbsp; <FontAwesomeIcon icon={faFileDownload} /></span>
        </button>
      </div>
      <SidePanel isOpen={isSidePanelOpen} onClose={closeSidePanel} content={sidePanelContent} onLinkClick={handleLinkClick}/>
    </div>
  );
}

export default Score;

