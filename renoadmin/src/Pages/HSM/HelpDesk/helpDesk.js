import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, images, view } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import Status from "./Status";
import Chatdetails from "./chatdetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { HSM_helpdesk } from "../../User_Management/features/userSlice";
import { useLocation } from "react-router-dom";

const PopupComponent = ({ onClose }) => {
  return (
    <div className="absolute top-0 right-0 h-full w-1/3">
      <div className="p-4">
        <Chatdetails onClose={onClose} />
      </div>
    </div>
  );
};

const Action = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClick = () => {
    // console.log("view")
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };


  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img onClick={handleClick} src={view} alt="View" />
      {/* <img src={deleteIcon} alt="Delete" /> */}
      {console.log("view")}
      {console.log(isPopupVisible)}
      {isPopupVisible && <PopupComponent onClose={handleClosePopup} /> }
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

const AllProjects = ({ setActiveTab, setExpand }) => {
  const head = "All Chats and Deals";
  // setExpand("homeService");
  // setActiveTab("helpDesk");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const chatData = useSelector((state) => state.userManagement.hsm_helpdesk);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(HSM_helpdesk());
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
      header: "Requester",
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
  const check = useLocation();
  const cht=check.state;

  console.log(chatData);
  const data = chatData.map((user) => ({
    photo: <Photo picUrl={user.pic} />,
    requester: user.registerar,
    subject: user.subject,
    message: user.message,
    status: <Status value={user.status} />,
    action: <Action  />,
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

export default AllProjects;
