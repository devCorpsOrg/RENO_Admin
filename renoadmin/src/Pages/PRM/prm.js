import React, { useEffect, useState } from "react";
import Table from "../../UI/CommonTable/Table";
import { deleteIcon, view, edit } from "./Assets/index";
import TopHeader from "../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "react-loader-spinner";
import { RoleManagement } from "../User_Management/features/userSlice";
// Component inside action column
const Action = () => {
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={edit} alt="edit" />
      <img src={view} alt="view" />
      <img src={deleteIcon} alt="Delete" />
    </div>
  );
};

const PMS = () => {
  const navigate = useNavigate();
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

  let count = 1; // initialize counter variable
  const data = roleData.map((user) => ({
    serial: count++,
    name: user.name,
    emailaddress: user.email,
    role: user.role,
    status: user.status,
    action: <Action />,
  }));

  const pageSize = 7;
  const greenButtonText = "Add New Role";

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

export default PMS;
