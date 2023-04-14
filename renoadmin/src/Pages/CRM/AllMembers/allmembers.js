import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";

// Component inside action column
const Action = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/home/memberDetails");
  };
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
    header: "Rewards Points",
    accessor: "rewardpoints",
  },
  {
    header: "Payment History",
    accessor: "paymenthistory",
  },
  {
    header: "Purchase History",
    accessor: "purchasehistory",
  },
  {
    header: "Contact No.",
    accessor: "contact",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const data = [
  {
    photo: <ProfilePhoto />,
    username: "Adrian",
    rewardpoints: 500,
    paymenthistory: `$ ${600}`,
    purchasehistory: `${5} items`,
    contact: `+65 ${12345678}`,
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Adrian",
    rewardpoints: 500,
    paymenthistory: `$ ${600}`,
    purchasehistory: `${5} items`,
    contact: `+65 ${12345678}`,
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Adrian",
    rewardpoints: 500,
    paymenthistory: `$ ${600}`,
    purchasehistory: `${5} items`,
    contact: `+65 ${12345678}`,
    action: <Action />,
  },
];

const pageSize = 10;
const greenButtonText = "Export All";

const allmembers = () => {
  const head = "All Members";
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] min-w-[88%] relative">
        <Table
          columns={columns}
          data={data}
          pageSize={pageSize}
          greenButtonText={greenButtonText}
        />
      </div>
    </div>
  );
};

export default allmembers;
