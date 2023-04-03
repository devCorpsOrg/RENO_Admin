import React, { useState, useEffect } from "react";
import "./Forgot.css";
import { Link, useNavigate } from "react-router-dom";

function Forgot() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
//   const [result, setResult] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();
    setUsername("");
    // try {
    //   const response = await axios
    //     .post("http://localhost:4000/", { username, password })
    //     .then((res) => {
    //       console.log(res);
    //       if ((res?.data == "Login successfull")) {
    //         setResult("Login Successfull")
    //         navigate("/main");
    //       }
    //     }); // Login .
    // } catch (error) {
    //   setResult(error.response.data); 
    // }
    // console.log(`Submitting ${username} and ${password}`);
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
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <div className="submit">
              <button className="login_button" type="submit">
                Reset Password
              </button>
              <Link to="/" className="forgot">
                Login
              </Link>
            </div>
            <div className="result">
              {/* {result} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;