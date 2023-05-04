import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  //   const [result, setResult] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const updateData = {
//         username,
//         email,
//         password
//     }

//     const jsonData = JSON.stringify(updateData);
//     console.log(jsonData);

//     try {
//         axios.post('/register/', jsonData)
//         .then((response) => {
//             setUsername("");
//             setEmail("");
//             setPassword("");
//             navigate("/")
//         })
        
//     }catch(err){
//         console.log("Error in sign up", err);
//     }

//   };

const handleSubmit = (event) => {
    event.preventDefault();
  
    const updateData = {
      username,
      email,
      password
    };
  
    const jsonData = JSON.stringify(updateData);
    console.log(jsonData);
  
    fetch('/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/");
    })
    .catch((error) => {
      console.error('There was an error:', error);
    });
  };
  

  return (
    <div className="login">
      <div className="login_box">
        <img className="logo" src="/images/logo.png" alt="" />
        <div className="login_header">
          <h1 className="headl">Sign Up</h1>
          <div className="signup">
            Create your account here
          </div>
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <label className="input">
              Username
              <input
                className="input_edit"
                placeholder="Enter your username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label className="input">
              Email Address
              <input
                className="input_edit"
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label className="input">
              Password
              <input
                className="input_edit"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <div className="submit">
              <button
                onClick={handleSubmit}
                className="login_button"
                type="submit">
                    Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register
