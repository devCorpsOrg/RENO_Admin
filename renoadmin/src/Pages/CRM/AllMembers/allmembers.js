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
    username: "Abhinav100",
    rewardpoints: 500,
    paymenthistory: `$ ${600}`,
    purchasehistory: `${5} items`,
    contact: `+91 ${9918283899}`,
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    rewardpoints: 500,
    paymenthistory: `$ ${600}`,
    purchasehistory: `${5} items`,
    contact: `+91 ${9918283899}`,
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    rewardpoints: 500,
    paymenthistory: `$ ${600}`,
    purchasehistory: `${5} items`,
    contact: `+91 ${9918283899}`,
    action: <Action />,
  },
  {
    photo: <ProfilePhoto />,
    username: "Abhinav100",
    rewardpoints: 500,
    paymenthistory: `$ ${600}`,
    purchasehistory: `${5} items`,
    contact: `+91 ${9918283899}`,
    action: <Action />,
  },
];

const pageSize = 10;
const greenButtonText = "Export All";

const allmembers = () => {
  return (
    <div>
      <Table
        columns={columns}
        data={data}
        pageSize={pageSize}
        greenButtonText={greenButtonText}
      />
    </div>
  );
};

export default allmembers;
