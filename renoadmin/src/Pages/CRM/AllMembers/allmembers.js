import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CRM } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";

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
  const head = "All Members";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const memberData = useSelector((state) => state.userManagement.crm);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(CRM());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

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

  const data = memberData.map((user) => ({
    photo: <ProfilePhoto />,
    username: user.usname,
    rewardpoints: user.pts,
    paymenthistory: `$ ${user.net_purchase_amt}`,
    purchasehistory: `${user.net_purchase_count} items`,
    contact: `+65 ${user.phone}`,
    action: <Action />,
  }));

  const pageSize = 10;
  const greenButtonText = "Export All";

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      {loading ? (
        <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      <div className=" ml-72 mt-28 h-[80vh] w-[140vh] relative">
        {memberData.length > 0 ? (
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
