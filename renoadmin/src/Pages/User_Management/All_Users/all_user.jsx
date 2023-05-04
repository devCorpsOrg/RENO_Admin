import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice";
import { Grid } from "react-loader-spinner";

// Component inside action column
const Action = () => {
  return (
    <div className="flex gap-3 items-center mr-10">
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

const Allmembers = () => {
  const head = "All Users";
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/createUser");
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userManagement.users);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(getUser());
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

  const pageSize = 5;
  const greenButtonText = "Add User";

  const data = userData.map((user) => ({
    photo: <ProfilePhoto />,
    username: user.username,
    emailaddress: user.email,
    contact: user.phone,
    usertype: user.role,
    userid: user.uid,
    action: <Action />,
  }));

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
      <div
        className=" ml-72 h-[90vh] w-[140vh] relative"
        style={{ marginTop: "70px" }}>
        {userData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenButtonText={greenButtonText}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={greenButtonText}
              greenClicked={greenClicked}
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
