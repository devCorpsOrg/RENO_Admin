import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");
    navigate("/home");
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
        <img className="logo" src="/images/logo.png" alt="" />
        <div className="login_header">
          <h1 className="headl">Login</h1>
          <div className="signup">
            Need an account? <a href="">Sign Up</a>
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
                Login
              </button>
              <Link to="/reset" className="forgot">
                Forgot Password?
              </Link>
            </div>
            <div className="result">{/* {result} */}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
