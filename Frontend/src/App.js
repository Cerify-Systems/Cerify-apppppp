//All the bugs and issues have been resolved and you c ..


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from './Routes/Pages/firebase';
import { AuthProvider, useAuth } from './AuthContext';

import Home from './Routes/Home';
import BusinessPlan from './Routes/Pages/BusinessPlan';
import BusinessPlan2 from './Routes/Pages/BusinessPlan2';
import AddFile from './Routes/Pages/AddFile';
import Login from './Routes/Pages/Login';
import Upload from './Routes/Pages/Upload';
import Score from './Routes/Pages/Score';
import FFaq from './Routes/Pages/FFaq';
import Signup from './Routes/Pages/Signup';
import Help from './Routes/Pages/Help';
import Profile from './Routes/Pages/Profile';
import PlagiarismCheck from './Routes/Pages/PlagiarismCheck';
import SummaryPanel from './Routes/Pages/SummaryPanel';
import About from './Routes/Pages/About';
import Admin from './Admin/Admin';
import Adminb from './Admin/Admin-boxes';
import Admind from './Admin/Admin-Dash';
import AdminLogin from './Admin/AdminLogin';
import svg from "./Images/drop1.gif";
import Chatbot from './Routes/Pages/Chatbot';



const auth = getAuth(app);

const App = () => {
  const { user, loading } = useAuth();

  const centeredStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#f0f0f0' // Optional: Add a background color
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%'
  };

  if (loading) {
    return  <div style={centeredStyle}>
    <img src={svg} alt="Loading" style={imageStyle} />
  </div>
  }

  return (
    <BrowserRouter>
      <Routes>
        {user == null ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/Score" element={<Score />} />
            <Route path="/FFaq" element={<FFaq />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Help" element={<Help />} />
       // Here i have added the all the auth routes , after work del. it ...
            
          </>
        ) : (
          <>
            <Route path="/Profile" element={<Profile user={user} />} />
            <Route path="/Admin" element={<Admin user={user} />} />
            <Route path="/Adminb" element={<Adminb />} />
            <Route path="/Admind" element={<Admind />} />
            <Route path="/BusinessPlan" element={<BusinessPlan />} />
            <Route path="/BusinessPlan2" element={<BusinessPlan2 />} />
            <Route path="/AddFile" element={<AddFile />} />
            <Route path="/PlagiarismCheck" element={<PlagiarismCheck />} />
            <Route path="/SummaryPanel" element={<SummaryPanel />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            
          </>
          
        )}
        <Route path="*" element={<Navigate to={user ? "/Profile" : "/"} />} />
      </Routes>
      {/**{user && (
        <div>
          <h1>Hello {user.displayName}!</h1>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      )} **/}
    </BrowserRouter>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
