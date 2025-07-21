import React, { useEffect ,useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, signInWithEmailAndPassword ,GoogleAuthProvider ,signInWithPopup } from 'firebase/auth';
import { PhoneAuthProvider } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom'; 
import { app } from "./firebase";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import loginImage from "./crypto2.jpg";
import Navbar from '../../Components/Navbar';
import About from './About';
import Help from './Help';
import FFaq from './FFaq';

const auth = getAuth(app);
const googleProvider =new GoogleAuthProvider();
const db = getFirestore(app); 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState('');
  const navigate = useNavigate();
  const contentMap = {
    'About': About,
    'FFaq': FFaq ,
    'Help': Help,
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, []);

  const handleLinkClick = (content) => {
    setSidePanelContent(contentMap[content]);
    setIsSidePanelOpen(true);
  };
  
  const signinwithgoogle = async()=>{
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log("User data fetched from Firestore:", userData);
      // Pass userData to profile page
      navigate('/profile', { state: { userData } });
    } else {
      console.log("No such document!");
    }
      const token = await user.getIdToken();
    } catch (error) {
      console.error("Error during Google login:", error);
    }
    
  };
 

 

  const signinuser = async(event) => {
    event.preventDefault(); 
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log("User data fetched from Firestore:", userData);
      navigate('/profile', { state: { userData } });
    } else {
      console.log("No such document!");
    }
    } catch (error) {
      console.error("Error during email/password login:", error);
    }
  };
  

  return (
   
    <div className=" min-h-screen font-sans bg-white relative">
      <header>
        <Navbar onLinkClick={handleLinkClick}/>
      </header>
      <div className='flex flex-col md:flex-row'>
      <div className=" md:h-screen  hidden md:flex ">
        <img src={loginImage} alt="Login Illustration" className='w-full h-full object-cover'/>
      </div>
      <div className="pt-8 flex flex-col px-6  md:px-10  mx-auto w-4/5 md:w-1/2 ">
      <Link to='/' className="flex items-center gap-3  mb-6"><FontAwesomeIcon icon={faLessThan} /><h4 className="text-lg">Back</h4></Link>
      
        <h1 className='mb-4 text-3xl md:text-5xl'>Transforming <br /> Your Business Outlook</h1>
        <p className='mb-10 text-base md:text-lg'>Login and show how you can change your outlook towards your career</p>
        {/* <div className="flex gap-8 ">
          <button onClick={signinwithgoogle} className="flex flex-row w-full p-3 bg-white cursor-pointer rounded-full border-2 border-black">
           <GoogleIcon fontSize="medium" className="mr-5 ml-2"/>
           <h5 className="font-semibold">Log in via Google</h5>
          </button>
          <button onclick={signinwithgoogle} className="flex flex-row w-full p-3 bg-white cursor-pointer rounded-full border-2 border-black">
            <LinkedInIcon fontSize="medium" className="mr-5 ml-2"/>
            <h5 className="font-semibold">Log in via LinkedIn</h5>
          </button>
        </div> */}
        {/* <div className="flex items-center my-8">
          <hr className="flex-grow border-t-2 border-black" />
          <span className="px-4 text-sm font-medium">OR</span>
          <hr className="flex-grow border-t-2 border-black" />
        </div> */}
        <form className="flex flex-col ">
          <div className="flex flex-col mb-4">
            <h5 className='text-[0.8rem] px-1 tracking-widest text-gray-500 bg-[#f4f6f9]'>EMAIL ADDRESS</h5>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="py-2 px-2 mb-2 bg-whitesmoke text-lg focus:outline-none border-b-[1px] bg-[#f4f6f9] border-black"
              type="email"
              placeholder="Enter your Email Address"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <h5 className="text-[0.8rem] px-1 tracking-widest text-gray-500 bg-[#f4f6f9]">PASSWORD</h5>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="py-2 px-2 mb-2 bg-whitesmoke text-lg focus:outline-none border-b-[1px] bg-[#f4f6f9] border-black"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button onClick={signinuser} type="submit" className="py-4 mt-4 bg-yellow-500 text-black text-lg cursor-pointer rounded-full login-form-button hover:bg-green-700 transition duration-300 w-3/4 mx-auto">Login</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Login;