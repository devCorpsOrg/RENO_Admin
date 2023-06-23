import React from "react";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import Status from "./Status";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteDeal,
  MPM_allchats,
} from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";

const Action = ({ dealId, dealName }) => {
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteDeal(dealId))
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

  const roles = cookie.get("role");
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      {roles === "admin" || roles === "editor" ? (
        <>
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
        </>
      ) : (
        "Not Accessible"
      )}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {dealName}?
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

const Photo = ({ picUrl }) => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={picUrl} alt="Photo" />
    </div>
  );
};

const AllChats = ({ setActiveTab, setExpand }) => {
  const head = "All Chats and Deals";
  setExpand("marketPlace");
  setActiveTab("chatsAndDeals");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const chatData = useSelector((state) => state.userManagement.mpm_allchats);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(MPM_allchats());
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
      header: "User",
      accessor: "requester",
    },
    {
      header: "Subject",
      accessor: "subject",
    },
    {
      header: "Message",
      accessor: "message",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  console.log(chatData);
  const data = chatData.map((user) => ({
    photo: <Photo picUrl={user.fields.pic_url} />,
    requester: user.fields.requester,
    subject: user.fields.subject,
    message: user.fields.msg,
    status: <Status value={user.fields.status} />,
    action: <Action dealName={user.fields.requester} dealId={user.pk} />,
  }));

  // Number of Pages to be display on a single page.
  const pageSize = 4;

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
      <div className=" ml-72 mt-28 h-[85vh] w-[140vh] relative">
        {chatData.length > 0 ? (
          <Table columns={columns} data={data} pageSize={pageSize} />
        ) : (
          <>
            <Table columns={columns} data={data} pageSize={pageSize} />
            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllChats;
