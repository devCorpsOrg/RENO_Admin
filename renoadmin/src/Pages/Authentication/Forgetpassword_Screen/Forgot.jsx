import React, { useState, useEffect } from "react";
import "./Forgot.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();
    const updatedData = {

    };

    const jsonData = JSON.stringify(updatedData);
    console.log(jsonData)
    axios.post('/forget_password/', {email})
    .then((response) => {
      setEmail("");
      navigate('/Signup');
    }).catch((err) => {
      console.log("Problem", err);
      setResult("Operation failed")
    })

  };

  return (
    <div className="login">
      <div className="login_box">
        <img className="logo" src="/images/logo.png" alt=""/>
        <div className="login_header">
          <h1 className="headl">Forgot Password</h1>
          <div className="signup">
            Let Us Help You
          </div>
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <label className="input">
              Enter Your Registered Email Address
              <input
                className="input_edit"
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <div className="submit">
              <button className="login_button" type="submit" style={{width:"150px"}}>
                Reset Password
              </button>
              <Link to="/" className="forgot" style={{right:110}}>
                Login
              </Link>
            </div>
            <div className="result">
              {result}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;