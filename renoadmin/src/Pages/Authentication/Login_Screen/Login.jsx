import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [result, setResult] = useState("");
  //   const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post("http://139.59.236.50:8000/login", { username, password })
      .then((response) => {
        setUsername("");
        setPassword("");
        console.log(response);
        const token = response.data.jwt;
        Cookies.set("jwt", token);
        Cookies.set("role", response.data.role);
        Cookies.set("username", response.data.username);
        Cookies.set("pic", response.data.pic);
        Cookies.set("uid", response.data.uid);
        // Cookies.set('jwt', token);
        setResult("Logged in Successfully");
        navigate("/home");
      })
      .catch((err) => {
        console.log("Problem", err);
        setResult("Authentication Failed !");
      });
  };

  return (
    <div className="login">
      <div className="login_box">
        <img className="logo" src="/images/logo.png" alt="" />
        <div className="login_header">
          <h1 className="headl">Login</h1>
          <div className="signup">
            Need an account? <a href="/register">Sign Up</a>
          </div>
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <label className="input">
              Username
              <input
                className="input_edit"
                required
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
                required
              />
            </label>
            <br />
            <div className="submit">
              <button
                // onSubmit={handleSubmit}
                className="login_button"
                type="submit">
                Login
              </button>
              <Link to="/reset" className="forgot">
                Forgot Password?
              </Link>
            </div>
            <div className="result">{result}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
