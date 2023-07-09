import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Authentication/Login_Screen/Login";
import Forgot from "./Pages/Authentication/Forgetpassword_Screen/Forgot";
import Signup from "./Pages/Authentication/SignUp Screen/Signup";
// import Dashboard from "./Pages/DashBoard_Screen/Dashboard";
// import Configuration from "./Pages/Configuration_Screen/Configuration";
// import Prm from "./Pages/PRM/prm";
// import UserDetails from "./Pages/User_Management/All_Users/all_user";
import Home from "./UI/Home";
import Register from "./Pages/Authentication/Register/Register";

function App() {
  return (
    <div className="App">
      <Router>
        {/* top-header */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Forgot />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
