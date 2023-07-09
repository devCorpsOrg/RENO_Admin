import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View, Edit, Suspend } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, DeleteUser } from "../features/userSlice"; // Import deleteUser action
import { Grid } from "react-loader-spinner";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";


// Component inside action column
const Action = ({ username, email, phone, uid, picUrl, role }) => {
  const Navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleViewClick = () => {
    const data = {
      photo: picUrl,
      username: username,
      email: email,
      phone: phone,
      role: role,
      uid: uid,
      // "about":about
    };
    Navigate(`/home/UserDetails?name=${username}`, { state: data });
  };
  const handleSuspendClick = () => {
    setShowPopup(true);
  };
  const handleSuspendConfirm = async () => {
    try {
      const response = await fetch(
        `http://139.59.236.50:8000/suspenduser/?name=${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ suspend_reason: suspendReason }),
        }
      );

      if (response.ok) {
        // alert("Successfully suspended the user.");
        window.location.reload(); // Reload the window after successful suspension
      } else {
        throw new Error("Failed to suspend the user.");
      }
    } catch (error) {
      console.log("Suspend error:", error);
      alert("Failed to suspend the user.");
    }
  };

  const handleSuspendCancel = () => {
    setShowPopup(false);
    setSuspendReason("");
  };

  const handleEditClick = () => {
    const data = {
      photo: picUrl,
      username: username,
      email: email,
      phone: phone,
      role: role,
      uid: uid,
    };
    Navigate(`/home/editDetails/?name=${username}`, { state: data });
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteUser(username))
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

  const roles = cookie.get('role');

  return (
    <div className="flex gap-3 items-center pr-20">
      <div className="flex w-5 h-5 flex gap-2 cursor-pointer">
      {roles === "admin" || roles === "editor" ? (
    <>
      <img src={Edit} onClick={handleEditClick} alt="Edit" />
      <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
      <img src={Suspend} onClick={handleSuspendClick} alt="Suspend" />
    </>
  ) : null}
  <img src={View} onClick={handleViewClick} alt="View" />
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded shadow">
            <div className="w-full">
              <h3 className="mb-2">Suspend User</h3>
              <textarea
                type="text"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="border border-gray-300 p-4 rounded mb-2 w-64"
                placeholder="Suspend Reason"
                required="true"
              />
            </div>
            <div className="flex p-5 justify-center">
              <button
                className="bg-lime-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleSuspendConfirm}>
                Suspend
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={handleSuspendCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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

const Allmembers = ({ setActiveTab, setExpand }) => {
  const head = "All Users";
  // setExpand("userManagement");
  // setActiveTab("allUsers");
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
  const filteredData = userData.filter((user) => user.is_suspend === 0);

  console.log(filteredData);
  const data = filteredData.map((user) => ({
    photo: <ProfilePhoto picUrl={user.pic} />,
    username: user.username,
    emailaddress: user.email,
    contact: user.phone,
    usertype: user.role,
    userid: user.uid,
    action: (
      <Action
        username={user.username}
        email={user.email}
        phone={user.phone}
        uid={user.uid}
        role={user.role}
        picUrl={user.pic}
      />
    ),
  }));

  const roles = cookie.get('role');
  console.log(roles)

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
            greenButtonText={roles === "admin" || roles === "editor" ? greenButtonText : ""}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={roles === "admin" || roles === "editor" ? greenButtonText : ""}
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
