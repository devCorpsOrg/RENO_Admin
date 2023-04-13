import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";

// Component inside action column
const Action = () => {
  return (
    <div className="flex gap-3 items-center">
      <button className="bg-[#8FC743] hover:bg-lime-600 h-10 w-28 text-white px-3 py-1 rounded">
        Suspend
      </button>
      <div className="flex w-6 h-6 flex gap-3 cursor-pointer">
        <img src={View} alt="View" />
        <img src={deleteIcon} alt="Delete" />
      </div>
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
    header: "Contact No.",
    accessor: "contact",
  },
  {
    header: "User Type",
    accessor: "usertype",
  },
  {
    header: "User ID",
    accessor: "userid",
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
    contact: `+91 ${99191313919}`,
    usertype: "Manager",
    userid: `#${1234}`,
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    emailaddress: "Abhinav123@gmail.com",
    contact: `+91 ${99191313919}`,
    usertype: "Manager",
    userid: `#${1234}`,
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    emailaddress: "Abhinav123@gmail.com",
    contact: `+91 ${99191313919}`,
    usertype: "Manager",
    userid: `#${1234}`,
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    emailaddress: "Abhinav123@gmail.com",
    contact: `+91 ${99191313919}`,
    usertype: "Manager",
    userid: `#${1234}`,
    action: <Action />,
  },
];

const pageSize = 10;
const greenButtonText = "Add User";
const Allmembers = () => {
  const head = "All Users";
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/editDetails");
  };
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div
        className=" ml-72 h-[90vh] w-[85%] relative"
        style={{ marginTop: "70px" }}>
        <Table
          columns={columns}
          data={data}
          pageSize={pageSize}
          greenButtonText={greenButtonText}
          greenClicked={greenClicked}
        />
      </div>
    </div>
  );
};

export default Allmembers;
