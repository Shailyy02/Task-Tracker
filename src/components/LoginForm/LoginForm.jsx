import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './LoginForm.css';

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Authentication logic
    if (email === "tasktracker@gmail.com" && password === "Sharma123") {
      localStorage.setItem("emailData", email);
      localStorage.setItem("passwordData", password);
      alert("Login Successful!");
      setIsAuthenticated(true); // Trigger redirection
    } else {
      alert("Invalid Credentials");
    }
    
    setIsLoading(false);
  };

  // Redirect to Dashboard if authenticated
  console.log("Authenticated:", isAuthenticated); // Debugging line
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" ref={emailRef} required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" ref={passwordRef} required />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" /> Remember Me</label>
          <a href="#">Forgot Password?</a>
        </div>
        {isLoading ? (
          <button type="submit" disabled>Loading...</button>
        ) : (
          <button type="submit">Login</button>
        )}
        <div className="register-link">
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
