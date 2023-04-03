import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";

function SideNavBar({ expand, setExpand, activeTab, setActiveTab }) {
  const activeMenu = true;
  const [subMenu, setSubMenu] = useState(false);
  console.log(activeTab)

  const handleMenu = () => {
    setSubMenu(!subMenu);
  };

  return (
    <div className="w-72 h-screen fixed" style={{ backgroundColor: "#EEEEEE", width:"17rem" }}>
      <div className=" hello ml-3 h-screen overflow-auto pb-10 scrollbar-hide">
        {activeMenu && (
          <>
            <div className="flex justify-between items-center">
              <img
                className="h-auto max-w-[70%] flex ml-8 mt-2"
                src="/images/logo.png"
                alt=""
                srcset=""
              />
            </div>

            <div className="mt-10 font-semibold" style={{ marginLeft: "4px" }}>
              MENU
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab == "dashboard" ? "green" : "#545e6f",
                  fontWeight: activeTab == "dashboard" ? "bold" : "inherit",
                }}
                activeClassName="active"
                to="/home"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("dashboard");
                  setExpand("dashboard");
                }}
              >
                <SpeedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Dashboard</span>
              </NavLink>
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: expand == "userManagement" ? "green" : "#545e6f",
                  fontWeight: expand == "userManagement" ? "bold" : "inherit",
                }}
                onClick={() => {
                  setExpand("userManagement");
                }}
                activeClassName="active"
                className="flex items-center"
              >
                <PersonOutlineOutlinedIcon
                  style={{ transform: "scale(0.65)" }}
                />
                <span className="pl-1">User Management</span>
                <div
                  style={{
                    transform: "scale(0.65)",
                    position: "relative",
                    left: "92px",
                  }}
                >
                  {expand == "userManagement" ? (
                    <RemoveIcon />
                  ) : (
                    <AddOutlinedIcon />
                  )}
                </div>
              </NavLink>

              {expand == "userManagement" && (
                <>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab == "allUsers" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "allUsers" ? "bold" : "inherit",
                      }}
                      to="/home/allUsers"
                      onClick={() => {
                        setActiveTab("allUsers");
                        setExpand("userManagement");
                      }}
                    >
                      All Users
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "suspendUsers" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "suspendUsers" ? "bold" : "inherit",
                      }}
                      to="/home/suspendUsers"
                      onClick={() => {
                        setActiveTab("suspendUsers");
                        setExpand("userManagement");
                      }}
                    >
                      Suspend Users
                    </NavLink>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color:
                    activeTab == "customerRelationship" ? "green" : "#545e6f",
                  fontWeight:
                    activeTab == "customerRelationship" ? "bold" : "inherit",
                }}
                activeClassName="active"
                to="/home/customerRelationship"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("customerRelationship");
                  setExpand("customerRelationship");
                }}
              >
                <PeopleAltOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Customer Relationship</span>
              </NavLink>
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab == "contentManagement" ? "green" : "#545e6f",
                  fontWeight:
                    activeTab == "contentManagement" ? "bold" : "inherit",
                }}
                activeClassName="active"
                to="/home/contentManagement"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("contentManagement");
                  setExpand("contentManagement");
                }}
              >
                <InsertDriveFileOutlinedIcon
                  style={{ transform: "scale(0.65)" }}
                />
                <span className="pl-1">Content Management</span>
              </NavLink>
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: expand == "showcaseManagement" ? "green" : "#545e6f",
                  fontWeight:
                    expand == "showcaseManagement" ? "bold" : "inherit",
                }}
                onClick={() => {
                  setExpand("showcaseManagement");
                }}
                activeClassName="active"
                className="flex items-center"
              >
                <WidgetsOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Showcase Management</span>
                <div
                  style={{
                    transform: "scale(0.65)",
                    position: "relative",
                    left: "57px",
                  }}
                >
                  {expand == "showcaseManagement" ? (
                    <RemoveIcon />
                  ) : (
                    <AddOutlinedIcon />
                  )}
                </div>
              </NavLink>

              {expand == "showcaseManagement" && (
                <>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab == "projectList" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "projectList" ? "bold" : "inherit",
                      }}
                      to="/home/projectList"
                      onClick={() => {
                        setActiveTab("projectList");
                        setExpand("showcaseManagement");
                      }}
                    >
                      Project List
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "featuredProject" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "featuredProject" ? "bold" : "inherit",
                      }}
                      to="/home/featuredProject"
                      onClick={() => {
                        setActiveTab("featuredProject");
                        setExpand("showcaseManagement");
                      }}
                    >
                      Featured Project
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab == "bookings" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "bookings" ? "bold" : "inherit",
                      }}
                      to="/home/bookings"
                      onClick={() => {
                        setActiveTab("bookings");
                        setExpand("showcaseManagement");
                      }}
                    >
                      Bookings
                    </NavLink>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: expand == "homeService" ? "green" : "#545e6f",

                  fontWeight: expand == "homeService" ? "bold" : "inherit",
                }}
                activeClassName="active"
                className="flex items-center"
                onClick={() => {
                  setExpand("homeService");
                }}
              >
                <HomeOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Home Service Management</span>
                <div
                  style={{
                    transform: "scale(0.65)",
                    position: "relative",
                    left: "36px",
                  }}
                >
                  {expand == "homeService" ? (
                    <RemoveIcon />
                  ) : (
                    <AddOutlinedIcon />
                  )}
                </div>
              </NavLink>
              {expand == "homeService" && (
                <>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab == "productList" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "productList" ? "bold" : "inherit",
                      }}
                      to="/home/productList"
                      onClick={() => {
                        setActiveTab("productList");
                        setExpand("homeService");
                      }}
                    >
                      Product List
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "featuredProduct" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "featuredProduct" ? "bold" : "inherit",
                      }}
                      to="/home/featuredProduct"
                      onClick={() => {
                        setActiveTab("featuredProduct");
                        setExpand("homeService");
                      }}
                    >
                      Featured Product
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "promotionManagement"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab == "promotionManagement"
                            ? "bold"
                            : "inherit",
                      }}
                      to="/home/promotionManagement"
                      onClick={() => {
                        setActiveTab("promotionManagement");
                        setExpand("homeService");
                      }}
                    >
                      Promotion Management
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "transactionHistory"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab == "transactionHistory"
                            ? "bold"
                            : "inherit",
                      }}
                      to="/home/transactionHistory"
                      onClick={() => {
                        setActiveTab("transactionHistory");
                        setExpand("homeService");
                      }}
                    >
                      Transaction/Purchase History
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "reviewManagement" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "reviewManagement" ? "bold" : "inherit",
                      }}
                      to="/home/reviewManagement"
                      onClick={() => {
                        setActiveTab("reviewManagement");
                        setExpand("homeService");
                      }}
                    >
                      Review Management
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab == "helpDesk" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "helpDesk" ? "bold" : "inherit",
                      }}
                      to="/home/helpDesk"
                      onClick={() => {
                        setActiveTab("helpDesk");
                        setExpand("homeService");
                      }}
                    >
                      Help Desk Chat
                    </NavLink>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: expand == "marketPlace" ? "green" : "#545e6f",
                  fontWeight: expand == "marketPlace" ? "bold" : "inherit",
                }}
                onClick={() => {
                  setExpand("marketPlace");
                }}
                className="flex items-center"
              >
                <StorefrontOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Market Place Management</span>
                <div
                  style={{
                    transform: "scale(0.65)",
                    position: "relative",
                    left: "41.5px",
                  }}
                >
                  {expand == "marketPlace" ? (
                    <RemoveIcon />
                  ) : (
                    <AddOutlinedIcon />
                  )}
                </div>
              </NavLink>
              {expand == "marketPlace" && (
                <>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab == "allMembers" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "allMembers" ? "bold" : "inherit",
                      }}
                      to="/home/allMembers"
                      onClick={() => {
                        setActiveTab("allMembers");
                        setExpand("marketPlace");
                      }}
                    >
                      All Members
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "suspendMarketUser"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab == "suspendMarketUser" ? "bold" : "inherit",
                      }}
                      to="/home/suspendMarketUser"
                      onClick={() => {
                        setActiveTab("suspendMarketUser");
                        setExpand("marketPlace");
                      }}
                    >
                      Suspend User
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "catagoryManagement"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab == "catagoryManagement"
                            ? "bold"
                            : "inherit",
                      }}
                      to="/home/catagoryManagement"
                      onClick={() => {
                        setActiveTab("catagoryManagement");
                        setExpand("marketPlace");
                      }}
                    >
                      Catagory Management
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "listingManagement"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab == "listingManagement" ? "bold" : "inherit",
                      }}
                      to="/home/listingManagement"
                      onClick={() => {
                        setActiveTab("listingManagement");
                        setExpand("marketPlace");
                      }}
                    >
                      Listing Management
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "chatsAndDeals" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab == "chatsAndDeals" ? "bold" : "inherit",
                      }}
                      to="/home/chatsAndDeals"
                      onClick={() => {
                        setActiveTab("chatsAndDeals");
                        setExpand("marketPlace");
                      }}
                    >
                      All Chats and Deals
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab == "reviewMarketManagement"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab == "reviewMarketManagement"
                            ? "bold"
                            : "inherit",
                      }}
                      to="/home/helpDesk"
                      onClick={() => {
                        setActiveTab("reviewMarketManagement");
                        setExpand("marketPlace");
                      }}
                    >
                      Review Management
                    </NavLink>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab == "permission" ? "green" : "#545e6f",
                  fontWeight: activeTab == "permission" ? "bold" : "inherit",
                }}
                activeClassName="active"
                to="/home/permission"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("permission");
                  setExpand("permission");
                }}
              >
                <TurnedInNotOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Permission and Role</span>
              </NavLink>
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab == "settings" ? "green" : "#545e6f",
                  fontWeight: activeTab == "settings" ? "bold" : "inherit",
                }}
                activeClassName="active"
                to="/home/settings"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("settings");
                  setExpand("settings");
                }}
              >
                <SettingsOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Settings</span>
              </NavLink>
            </div>

            <div className="flex justify-center" style={{ marginTop: "150px" }}>
              <NavLink to="/">
                <img src="/images/logout.png" alt="" srcset="" />
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SideNavBar;
