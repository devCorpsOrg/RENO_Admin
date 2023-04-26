import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Component inside action column
// The details of user shall be different for every users. It will be integrated at authentication of the users.
const Action = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home/userDetails");
  };
  const head = "Suspended Users";
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={View} onClick={handleClick} alt="View" />
      <img src={deleteIcon} alt="Delete" />
    </div>
  );
};

const ProfilePhoto = () => {
  return (
    <div>
      <img className="w-12 h-12 rounded-full" src={Photo} alt="photo" />
    </div>
  );
};

const AllMembers = () => {
  const head = "Suspend User List";

  const [suspendUser, setSuspendUsers] = useState([]);

  const url = "/searchusers/asd123";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setSuspendUsers(response.data);
        console.log(response.data); // check what is being returned
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      header: "Photo",
      accessor: "photo",
    },
    {
      header: "Username",
      accessor: "username",
    },
    {
      header: "Email Address",
      accessor: "email",
    },
    {
      header: "Suspended Reason",
      accessor: "suspendedReason",
    },
    {
      header: "Role",
      accessor: "role",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];
  const pageSize = 10;

  // const data = suspendUser.map((user) => ({
  //   photo: <ProfilePhoto />,
  //   username: user.username,
  //   email: user.email,
  //   suspendedReason: user.suspended_reason,
  //   role: user.role,
  //   action: <Action />,
  // }));

  const data = {
    photo: <ProfilePhoto />,
    username: "John Doe",
    email: "John@sample.com",
    suspendedReason: "This is the reason of suspension",
    role: "Admin",
    action: <Action />,
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader head={head} />
      </div>
      <div className="ml-72 mt-18 h-[98vh] min-w-[94%] relative">
        {suspendUser.length > 0 ? (
          <Table columns={columns} data={data} pageSize={pageSize} />
        ) : (
          <h2>No data</h2>
        )}
      </div>
    </div>
  );
};

export default AllMembers;
