import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Allmembers = () => {
  const pageSize = 10;
  const greenButtonText = "Export All";
  const head = "All Members";

  const [allMembers, setAllMembers] = useState([]);

  const url = "/members";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setAllMembers(response.data);
        console.log(response.data); //Have to remove this at the end.
      })
      .catch((error) => console.log(error));
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

  const data = allMembers.map((user) => ({
    photo: <ProfilePhoto />,
    username: user.usname,
    rewardpoints: user.pts,
    paymenthistory: `$ ${user.net_purchase_amt}`,
    purchasehistory: `${user.net_purchase_count} items`,
    contact: `+65 ${user.phone}`,
    action: <Action />,
  }));

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] min-w-[88%] relative">
        {allMembers.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenButtonText={greenButtonText}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={greenButtonText}
            />
            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Allmembers;
