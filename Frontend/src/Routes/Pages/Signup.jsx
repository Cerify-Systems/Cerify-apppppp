import React, { useState } from "react";

import { getAuth ,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./firebase";
import loginImage from "./crypto2.jpg";
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import About from "./About";
import Help from "./Help";
import Navbar from "../../Components/Navbar";
import FFaq from "./FFaq";
const contentMap = {
  'About': About,
  'FFaq': FFaq ,
  'Help': Help,
};


const auth =getAuth();
const googleProvider =new GoogleAuthProvider();
const db = getFirestore(app);

 
const Signup = () => {


  const signinwithgoogle =()=>{
    signInWithPopup(auth ,googleProvider);
    
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userData, setUserData] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState('');
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert("User Registered Successfully:", user);
      await setDoc(doc(db, "users", user.uid), {
        firstName: fname,
        lastName: lname,
        email: user.email,
        uid: user.uid,
      });
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data()); 
      } else {
        console.log("No such document!");
      }
      alert("User Registered and Data Saved in Firestore");
      console.log("User data saved in Firestore:", {
        firstName: fname,
        lastName: lname,
        email: user.email,
        uid: user.uid
      });
      console.log("User data saved in Firestore");
    } catch (error) {
      console.log("Error:", error.message);
      alert("Error: Please check Console !!");
    }
  };
  const handleLinkClick = (content) => {
    setSidePanelContent(contentMap[content]);
    setIsSidePanelOpen(true);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <div className="min-h-screen font-sans bg-white relative">
    <header>
    <Navbar onLinkClick={handleLinkClick} />
  </header>
    <div className="flex flex-col md:flex-row">
      <div className=" hidden md:flex md:h-screen ">
        <img src={loginImage} alt="Login Illustration" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col pt-8 px-6 md:px-10 bg-white w-5/6 mx-auto md:w-1/2">
        <Link to='/' className="flex items-center gap-3  mb-6"><FontAwesomeIcon icon={faLessThan} /><h4 className="text-lg">Back</h4></Link>
        <h1 className="mb-4 text-3xl md:text-5xl">Transforming <br /> Your Business Outlook</h1>
        <p className="mb-6 md:mb-10 text-base md:text-lg">Sign up and show how you can change your outlook towards your career</p>
        {/* <div className="flex gap-8 ">
          <button onClick={signinwithgoogle} className="flex flex-row w-full p-3 bg-white cursor-pointer rounded-full border-2 border-black">
            <GoogleIcon fontSize="medium" className="mr-5 ml-2"/>
            <h5 className="font-semibold">Sign in via Google</h5>
          </button>
          <button onClick={signinwithgoogle} className="flex flex-row w-full p-3 bg-white cursor-pointer rounded-full border-2 border-black">
            <LinkedInIcon fontSize="medium" className="mr-5 ml-2"/>
            <h5 className="font-semibold">Sign in via LinkedIn</h5>
          </button>
        </div> */}
        {/* <div className="flex items-center my-8">
          <hr className="flex-grow border-t-2 border-black" />
          <span className="px-4 text-sm font-medium">OR</span>
          <hr className="flex-grow border-t-2 border-black" />
        </div> */}
        <form className="flex flex-col " onSubmit={handleRegister}>
          <div className="flex flex-col mb-2 ">
            
              <h5 className="text-[0.8rem] px-1 tracking-widest text-gray-500 bg-[#f4f6f9]">NAME</h5>
              <input
                type="text"
                placeholder="Enter your Name"
                className=" py-2 px-2 mb-2 bg-[#f4f6f9] text-lg focus:outline-none border-b-[1px] border-black"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>
            
          
          <div className="flex flex-col mb-4 ">
            <h5 className="text-[0.8rem] px-1 tracking-widest text-gray-500 bg-[#f4f6f9]">EMAIL ADDRESS</h5>
            <input
              type="email"
              placeholder="Enter your Email Address"
              className=" py-2 px-2 mb-2 bg-[#f4f6f9] text-lg focus:outline-none border-b-[1px] border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <h5 className="text-[0.8rem] px-1 tracking-widest text-gray-500 bg-[#f4f6f9]">PASSWORD</h5>
            <input
              type="password"
              placeholder="Password"
              className="py-2 px-2 mb-2 bg-[#f4f6f9] text-lg focus:outline-none border-b-[1px] border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="py-3 mt-2 bg-yellow-500 text-black text-lg cursor-pointer rounded-full login-form-button hover:bg-green-700 transition duration-300">Create Account</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default Signup;