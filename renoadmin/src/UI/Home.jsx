import React, {useState} from 'react'
import SideNavBar from './SideNavigationBar/SideNavBar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from '../Pages/DashBoard_Screen/Dashboard'
import UserDetails from '../Pages/User_Management/All_Users/all_user'
import Configuration from '../Pages/Configuration_Screen/Configuration'
import Prm from '../Pages/PRM/prm'
import EditUser from '../Pages/User_Management/Edit_User_Screen/editUser'
import CreateNewPage from '../Pages/Content_Management/CreateNewPage/createNewPage'
import ViewUser from '../Pages/User_Management/View_Details/viewuser'
import MemberDetails from '../Pages/CRM/MemberDetails/memberdetails'
import AddNewShowcase from '../Pages/PSM/AddNewShowCase/addNewShowcase'
import EditShowcase from '../Pages/PSM/EditShowcase/editShowcase'
import AddProduct from '../Pages/HSM/AddProduct/addProduct'
import AddPromotion from '../Pages/HSM/AddNewPromotion/addNewPromotion'
import EditService from '../Pages/HSM/EditService/editService'
import EditProduct from '../Pages/HSM/EditProducts/editProducts'


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
          <Route exact path="/editDetails" element={<EditUser setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/UserDetails" element={<ViewUser setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/MemberDetails" element={<MemberDetails setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/createNewPage" element={<CreateNewPage setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/addShowcase" element={<AddNewShowcase setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/addProduct" element={<AddProduct setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/addPromotion" element={<AddPromotion setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/editServices" element={<EditService setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/editProduct" element={<EditProduct setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/editShowcase" element={<EditShowcase setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/permission" element={<Prm setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
          <Route exact path="/settings" element={<Configuration setExpand={togleExpand} setActiveTab={handleActiveTab} />} />
        </Routes>
    </div>
  )
}

export default Home
