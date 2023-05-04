import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "react-loader-spinner";
import { suspendUsers } from "../features/userSlice";

// Component inside action column
// The details of user shall be different for every users. It will be integrated at authentication of the users.
const Action = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home/userDetails");
  };
  const head = "Suspended Users";
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={View} onClick={handleClick} alt="View" />
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

const SuspendUsers = () => {
  const head = "Suspend User List";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const suspendedData = useSelector(
    (state) => state.userManagement.suspendUsers
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(suspendUsers());
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

  const data = suspendedData.map((user) => ({
    photo: <ProfilePhoto />,
    username: user.usmame,
    emailaddress: user.email,
    suspendedreason: user.suspend_reason,
    role: user.role,
    action: <Action />,
  }));

  const pageSize = 10;
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader head={head} />
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
      <div className=" ml-72 mt-18 h-[98vh] w-[140vh] relative">
        {suspendedData.length > 0 ? (
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

export default SuspendUsers;
