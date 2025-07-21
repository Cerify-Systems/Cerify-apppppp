import React from 'react';
import './PlagiarismCheck.css';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';

const PlagiarismCheck = () => {
  return (
    <div className="plagiarism-check">
      <h3>Plagiarism check</h3>
      <div className="check-item">
        <span>Language Used</span>
        <span>Consistent</span>
        <span className="status approved"><AiOutlineCheckCircle /> Approved</span>
      </div>
      <div className="check-item">
        <span>Reused Words</span>
        <span>Within Threshold</span>
        <span className="status approved"><AiOutlineCheckCircle /> Approved</span>
      </div>
      <div className="check-item">
        <span>Information Authenticity</span>
        <span>Good</span>
        <span className="status approved"><AiOutlineCheckCircle /> Approved</span>
      </div>
    </div>
  );
};

export default PlagiarismCheck;
