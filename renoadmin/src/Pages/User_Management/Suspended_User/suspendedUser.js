import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";

// Component inside action column
// The details of user shall be different for every users. It will be integrated at authentication of the users.
const Action = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/home/userDetails");
  };
  const head = "Suspended Users";
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={View} onClick={handleClick} alt="Edit" />
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
    accessor: "emailaddress",
  },
  {
    header: "Suspended Reason",
    accessor: "suspendedreason",
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

const data = [
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    emailaddress: "Abhinav123@gmail.com",
    suspendedreason: "Lorem ipsum dolor sit amet,",
    role: "Admin",
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    emailaddress: "Abhinav123@gmail.com",
    suspendedreason: "Lorem ipsum dolor sit amet,",
    role: "Admin",
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    emailaddress: "Abhinav123@gmail.com",
    suspendedreason: "Lorem ipsum dolor sit amet,",
    role: "Admin",
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    emailaddress: "Abhinav123@gmail.com",
    suspendedreason: "Lorem ipsum dolor sit amet,",
    role: "Admin",
    action: <Action />,
  },
];

const pageSize = 10;

const allmembers = () => {
  const head = "Suspend User List";
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-18 h-[98vh] w-[140vh] relative">
        <Table columns={columns} data={data} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default allmembers;
