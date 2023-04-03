import React, {useState} from 'react'
import SideNavBar from './SideNavigationBar/SideNavBar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from '../Pages/DashBoard_Screen/Dashboard'
import UserDetails from '../Pages/User_Management/All_Users/all_user'
import Configuration from '../Pages/Configuration_Screen/Configuration'
import Prm from '../Pages/PRM/prm'


function Home() {
    const [expand, setExpand] = useState("");
    const [activeTab, setActiveTab] = useState("dashboard");

    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }

    const togleExpand = (menu) =>{
        setExpand(menu);
    }
  return (
    <div className='flex'>
      <SideNavBar expand={expand} setExpand={togleExpand} activeTab={activeTab} setActiveTab={handleActiveTab} />
        <Routes>
          <Route exact path="/" element={<Dashboard/>} />
          <Route exact path="/allUsers" element={<UserDetails setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/permission" element={<Prm setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/settings" element={<Configuration setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
        </Routes>
    </div>
  )
}

export default Home
