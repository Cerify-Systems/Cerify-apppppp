import React from 'react';
import './SummaryPanel.css';
import PlagiarismCheck from './PlagiarismCheck';

const SummaryPanel = () => {
  return (
    <div className="summary-panel">
      <h2>Summary Panel</h2>
      <div className="score-section">
        <h3>Your score</h3>
        <div className="score-circle">7.5 / 10</div>
        <div className="score-details">
          <div className="score-pass">06 / 13 works</div>
          <div className="score-fail">14 issues found</div>
        </div>
      </div>
      <PlagiarismCheck />
      {/* Other checks like Clean Code, Structure, etc. */}
    </div>
  );
};

export default SummaryPanel;
