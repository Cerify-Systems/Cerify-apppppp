import React, { useState } from 'react';
import "./Admin.css";
import Cerify from "./Cerify.png";
import Navbar4 from '../Components/Navbar4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usflag from '../Images/us-flag.png';
import canada from '../Images/canada.png';
import german from '../Images/german.png';
import mexico from '../Images/mexico.png';
import france from '../Images/france.png';
import { faHandshakeAngle,faClockRotateLeft, faCheck, faChartSimple} from '@fortawesome/free-solid-svg-icons';



function Admin({ user }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="app-container">
      <Navbar4/>
      <div className="sidebar-container"> 
      </div>
      <div className="main-content">
        <main className="main">
          <div className="user-info">
            <h2>Hello,</h2>
            <h1>{user.displayName}</h1>
            <div className='ProfileDetailsBelow'>
            <div className="date-range">
              <span className='datestart'>01 Mar 2023</span>
              <span>30 Apr 2023</span>
             
            </div>
            <div className="actions">
              <button className="overview-button">Overview</button>
              <button className="revenue-button">Revenue</button>
              <button className="applications-button">Applications</button>
            </div>
          </div>
          </div>
          <div className='all-cards'>
          <div className="content-container">
            <div className="reviews-card">
              <h3>Overall Reviews</h3>
              <div class="line">
                <div class="segment segment1"></div>
                <div class="segment segment2"></div>
                <div class="segment segment3"></div>
              </div>
              <div className="review-progress">
                <div className="to-pick-up">
                  {/* <span className="material-icons">access_time</span> */}
                  <span><FontAwesomeIcon icon={faHandshakeAngle} style={{color: "#998dd9",}} />&nbsp;To Pick up</span>
                  <span>162</span>
                </div>
                <div className="overdue">
                  {/* <span className="material-icons">error_outline</span> */}
                  <span><FontAwesomeIcon icon={faClockRotateLeft} style={{color: "#ff8492",}} />&nbsp; Overdue</span>
                  <span>17</span>
                </div>
                <div className="completed">
                  {/* <span className="material-icons">done_all</span> */}
                  <span><FontAwesomeIcon icon={faCheck} style={{color: "#0065ff",}} /> &nbsp; Completed</span>
                  <span>301</span>
                </div>
              </div>
            </div>
            <div className="asks-card">
              <div className='heading-asks-card'>
              <h3>Top asks for certification</h3>
              <button className="see-all-button">See all</button>
              </div>
              {/* {certication.map((cert) => ())} */}
              <ul>
                <li className="asks-list-item">
                  <span>Business documents</span>
                  <span>70</span>
                  <span>↑ 18%</span>
                </li>
                <li className="asks-list-item">
                  <span>Blockchain</span>
                  <span>67</span>
                  <span>↑ 8%</span>
                </li>
                <li className="asks-list-item">
                  <span>NFT</span>
                  <span>56</span>
                  <span>↑ 1%</span>
                </li>
                <li className="asks-list-item">
                  <span>Finance</span>
                  <span>40</span>
                  <span>↑ 9%</span>
                </li>
                <li className="asks-list-item">
                  <span>Accounting</span>
                  <span>39</span>
                  <span>↑ 80%</span>
                </li>
              </ul>
            </div>  
          </div>
          <div className="activity-feed-card">
            <h3>Activity feed</h3>
            <div className="new-count">NEW (2)</div>
            <ul>
              <li className="activity-item">
                {/* <span className="material-icons">timeline</span> */}
                <span>2 mins ago</span>
                <span>Jane Cooper application</span>
                <span>International Business Management</span>
                {/* <span className="activity-status">progressed</span> */}
                {/* <div className="activity-actions">
                  <button className="audit-button">Audit request</button>
                  <button className="verified-button">Verified</button>
                </div> */}
              </li>
             
              <li className="activity-item">
                {/* <span className="material-icons">timeline</span> */}
                <span>1 day ago</span>
                <span>Raj Gaurav added 3 documents to</span>
                <span>Guy Hawkins profile</span>
              </li>
              <li className="activity-item">
                {/* <span className="material-icons">timeline</span> */}
                <span>1 day ago</span>
                <span>International Business Management</span>
                <span>updated Proposal</span>
              </li>
              <li className="activity-item">
                {/* <span className="material-icons">timeline</span> */}
                <span>1 day ago</span>
                <span>Raj Gaurav added 3 documents to</span>
                <span>Guy Hawkins profile</span>
              </li>
            </ul>
          </div>
          <div className="content-container">
            <div className="breakdown-card">
              <div className='heading-breakdown-card'>
              <h3>Application breakdown</h3>
              <button className="see-all-button">See all</button>
              </div>
              <div className="breakdown-count ">
                <span>128</span>
                <span>↑ 10 This month</span>
              </div>
              <ul>
                <li>
                  {/* <span className="material-icons"></span> */}
                  <span><FontAwesomeIcon icon={faChartSimple} />&nbsp;Yet to audit</span>
                  <span>2</span>
                  <span>↑ 8</span>
                </li>
                <li>
                  {/* <span className="material-icons">check_circle</span> */}
                  <span><FontAwesomeIcon icon={faChartSimple} /> &nbsp;Approved</span>
                  <span>130</span>
                  <span>↑ 18</span>
                </li>
                <li>
                  {/* <span className="material-icons">cancel</span> */}
                  <span><FontAwesomeIcon icon={faChartSimple} /> &nbsp;Corrections</span>
                  <span>11</span>
                  <span>↓ 22</span>
                </li>
              </ul>
            </div>
            <div className="documents-card">
              <div className='heading-documents-card'>
              <h3>Documents from</h3>
              <button className="see-all-button">See all</button>
              </div>
              <div className="documents-chart">
                <div className="chart-bar">
                  <div className="bar-fill" style={{ height: '75%' }}></div>
                  <span>3k</span>
                  <img src={usflag} alt="US flag" />
                </div>
                <div className="chart-bar">
                  <div className="bar-fill" style={{ height: '50%' }}></div>
                  <span>1.5k</span>
                  <img src={canada} alt="Canadian flag" />
                </div>
                <div className="chart-bar">
                  <div className="bar-fill" style={{ height: '85%' }}></div>
                  <span>2.5k</span>
                  <img src={german} alt="German flag" />
                </div>
                <div className="chart-bar">
                  <div className="bar-fill" style={{ height: '35%' }}></div>
                  <span>1k</span>
                  <img src={mexico} alt="Mexican flag" />
                </div>
                <div className="chart-bar">
                  <div className="bar-fill" style={{ height: '35%', color:'black'}}></div>/
                  <span>1k</span>
                  <img src={france} alt="French flag" />
                </div>
                {/* <div className="bar-fill" style={{ height: '35%', color:'black'}}></div>/ */}
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
