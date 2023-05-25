import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CRM, DeleteRelation } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import axios from "axios";
import { Alert, AlertTitle, Button } from "@mui/material";

// Component inside action column
const Action = ({
  username,
  purchase,
  payment,
  contact,
  points,
  email,
  about,
  picUrl,
}) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleClick = () => {
    const data = {
      username: username,
      purchase: purchase,
      payment: payment,
      contact: contact,
      points: points,
      about: about,
      email: email,
      picUrl: picUrl,
    };
    Navigate(`/home/memberDetails?name=${username}`, { state: data });
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteRelation(username))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={View} onClick={handleClick} alt="Edit" />
      <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {username}?
              </p>
              <div className="p-5">
                <Button onClick={handleConfirmDelete} color="error" autoFocus>
                  Delete
                </Button>
                <Button onClick={handleCancelDelete} color="inherit">
                  Cancel
                </Button>
              </div>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfilePhoto = ({ picUrl }) => {
  return (
    <div>
      <img className="w-12 h-12 rounded-full" src={picUrl} alt="photo" />
    </div>
  );
};

const Allmembers = ({ setActiveTab }) => {
  const head = "All Members";
  setActiveTab("customerRelationship");

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
  console.log("This is memeber Data :", memberData);

  const data = memberData.map((user) => ({
    photo: <ProfilePhoto picUrl={user.fields.pic} />,
    username: user.fields.usname,
    rewardpoints: user.fields.pts,
    paymenthistory: `$ ${user.fields.net_purchase_amount}`,
    purchasehistory: `${user.fields.net_purchase_count} items`,
    contact: `+65 ${user.fields.phone}`,
    action: (
      <Action
        points={user.fields.pts}
        payment={user.fields.net_purchase_amount}
        purchase={user.fields.net_purchase_count}
        contact={user.fields.phone}
        username={user.fields.usname}
        email={user.fields.email}
        about={user.fields.abt}
        picUrl={user.fields.pic_url}
      />
    ),
  }));

  const pageSize = 10;
  const greenButtonText = "Export All";

  // const handleButtonClick = () => {
  //   axios.get('http://139.59.236.50:8000/exportcustomers')
  //   .then((response)=>{
  //     console.log(response)
  //   }).catch((err)=>{
  //     console.log('Error to call API', err)
  //   })
  // }

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
            greenButtonText={
              <a href="http://139.59.236.50:8000/exportcustomers">
                {greenButtonText}
              </a>
            }
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={
                <a href="http://139.59.236.50:8000/exportcustomers">
                  {greenButtonText}
                </a>
              }
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
