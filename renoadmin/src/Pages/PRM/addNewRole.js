import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../UI/TopHeader/TopHeader";
import axios from "axios";

const AddNewRole = ({setActiveTab}) => {
  setActiveTab("permission");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userRole, setUserRole] = useState("");
  const [roleStatus, setRoleStatus] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
  };

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleRoleStatusChange = (event) => {
    setRoleStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can add code here to submit the form data to the server
    const updatedData={
      userName,
      emailAddress,
      userRole,
      roleStatus,
    }

    const jsonData=JSON.stringify(updatedData);
    console.log(jsonData);
    try{
      const response = await axios.post('/createrole/', jsonData)
      .then(response => {
        setUserName("");
        setEmailAddress("");
        setUserRole();
        setRoleStatus();
      })
    }
    catch(err){
      console.log("Error saving data", err);
    }
  };
  const head = "Add New Role";

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] w-[140vh] relative">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-full p-5 pt-10">
          <div className="mb-5">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-bold mb-2">
              User Name:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter User Name"
              value={userName}
              onChange={handleUserNameChange}
              required
              className="h-[60px] p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="emailAddress"
              className="block text-gray-700 font-bold mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={emailAddress}
              placeholder="Enter Email Address"
              onChange={handleEmailAddressChange}
              required
              className="h-[60px] p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userRole"
              className="block text-gray-700 font-bold mb-2">
              Select User Role:
            </label>
            <select
              id="userRole"
              name="userRole"
              value={userRole}
              onChange={handleUserRoleChange}
              required
              className="h-[60px] p-3 w-full border rounded-md border-blue-200 focus:border-blue-300 appearance-none pr-4">
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="roleStatus"
              className="block text-gray-700 font-bold mb-2">
              Select Role Status:
            </label>
            <select
              id="roleStatus"
              name="roleStatus"
              value={roleStatus}
              onChange={handleRoleStatusChange}
              required
              className="h-[60px] p-3 w-full border rounded-md border-blue-200 focus:border-blue-300 appearance-none pr-4">
              <option value="assigned">Assign</option>
              <option value="not_assigned">Not Assign</option>
            </select>
          </div>
          <div className="flex items-center mt-3 justify-start">
            <button
              type="submit"
              className="bg-lime-500 hover:bg-lime-700 text-white font-bold w-[25vh] h-[7vh] py-2 px-5 rounded-dm">
              Add New Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewRole;
