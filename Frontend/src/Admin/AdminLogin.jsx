import React, { useState } from 'react';
import login from "./Cerify.png";
import { Link } from 'react-router-dom';
const AdminLogin = () => {
  const [email, setEmail] = useState('hello@cerify.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#f2f5f9] to-[#dbece5]">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="text-center mb-6">
          <img src={login} alt="Cerify Logo" className="w-24 mx-auto mb-4" />
          <h2 className="text-3xl font-light">Admin Panel</h2>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block bg-gray-100 text-left px-2">Email Address</label>
          <div className="flex items-center">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`border-b px-2 border-gray-300 bg-gray-100 w-full  focus:outline-none ${isEmailValid ? 'text-black' : 'border-red-500'}`}
              required
            />
            <span className={` text-green-500 border-b border-gray-300 bg-gray-100 ${isEmailValid ? 'block' : 'hidden'}`}>✔</span>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block px-2 text-left bg-gray-100">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border-b px-2 border-gray-300 w-full  px-1 focus:outline-none bg-gray-100"
              required
            />
            <button
              type="button"
              className="absolute right-0  mt-0 mr-3 text-gray-500"
              onClick={toggleShowPassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <Link to="/Profile">
        <button type="submit" className="w-full  bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300">
          Login to my account
        </button>
        </Link>
      </form>
    </div>
  );
};

export default AdminLogin;