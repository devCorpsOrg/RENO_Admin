import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";

// Component inside action column
const Action = () => {
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={View} alt="Edit" />
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
  return (
    <div>
      <Table columns={columns} data={data} pageSize={pageSize} />
    </div>
  );
};

export default allmembers;
