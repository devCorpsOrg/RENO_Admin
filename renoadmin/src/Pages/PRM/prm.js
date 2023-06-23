import React from "react";
import Table from "../../UI/CommonTable/Table";
import { deleteIcon, view, edit } from "./Assets/index";
import TopHeader from "../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import {
  DeleteRole,
  RoleManagement,
} from "../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";

// Component inside action column
const Action = ({ roleName }) => {
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteRole(roleName))
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
      {/* <img src={edit} alt="edit" /> */}
      {/* <img src={view} alt="view" /> */}
      {roles === "admin" || roles === "editor" ? (
        <>
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
        </>
      ) : "Not Accessible"}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {roleName}?
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

const PMS = ({ setActiveTab }) => {
  const navigate = useNavigate();
  setActiveTab("permission");
  const greenClicked = () => {
    navigate("/home/addNewRole");
  };
  const head = "Permission and Role Management";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const roleData = useSelector((state) => state.userManagement.role);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(RoleManagement());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  const columns = [
    {
      header: "Sr No.",
      accessor: "serial",
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email Address",
      accessor: "emailaddress",
    },
    {
      header: "Role",
      accessor: "role",
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

  console.log(roleData);
  let count = 1; // initialize counter variable
  const data = roleData.map((user) => ({
    serial: count++,
    name: user.fields.usname,
    emailaddress: user.fields.email,
    role: user.fields.role,
    status: user.fields.status,
    action: <Action roleName={user.fields.usname} />,
  }));

  const pageSize = 7;
  const greenButtonText = "Add New Role";

  const roles = cookie.get("role");

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
        {roleData.length > 0 ? (
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

export default PMS;
