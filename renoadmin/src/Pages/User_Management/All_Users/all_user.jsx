import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice";
// import { getUser } from "../features/userSlice";

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
    Navigate("/home/editDetails");
  };

  // const [userData, setUserData] = useState([]);

  // const url = "/user";
  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setUserData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userManagement);
  // console.log(userData)
  useEffect(() => {
    console.log("hey")
    dispatch(getUser());
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

  // const data = userData.map((user) => ({
  //   photo: <ProfilePhoto />,
  //   username: user.username,
  //   emailaddress: user.email,
  //   contact: user.phone,
  //   usertype: user.role,
  //   userid: user.uid,
  //   action: <Action />,
  // }));

  return (
    <div>
      {/* <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div
        className=" ml-72 h-[90vh] min-w-[75%] relative"
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
      </div> */}
    </div>
  );
};

export default Allmembers;