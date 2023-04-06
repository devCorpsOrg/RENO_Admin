import React from "react";
import SideNavBar from "../../../UI/SideNavigationBar/SideNavBar";
import TopHeader from "../../../UI/TopHeader/TopHeader";


const UserDetails = ({setActiveTab, setExpand}) => {
  setActiveTab("allUsers")
  setExpand("userManagement")
  const head="All Users";

  return (
    <div>
      <div className="flex">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className="ml-72">
          
      </div>
    </div>
  );
};

export default UserDetails;
