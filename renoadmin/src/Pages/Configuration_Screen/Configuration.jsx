import React from "react";
import SideNavBar from "../../UI/SideNavigationBar/SideNavBar";
import TopHeader from "../../UI/TopHeader/TopHeader";

const Configuration = ({setActiveTab, setExpand}) => {
  setActiveTab("settings")
  const head="Configuration and Settings";
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

export default Configuration;
