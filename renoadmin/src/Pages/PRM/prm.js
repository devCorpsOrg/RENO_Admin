import React, { useEffect, useState } from "react";
import Table from "../../UI/CommonTable/Table";
import { deleteIcon, view, edit } from "./Assets/index";
import TopHeader from "../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const [role, setRole] = useState([]);
  const url = "/roles";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setRole(response.data);
        console.log(response.data); //Have to remove this at the end.
      })
      .catch((error) => console.log(error));
  }, [role]);

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
  const data = role.map((user) => ({
    serial: count++,
    name: user.name,
    emailaddress: user.email,
    role: user.role,
    status: user.status,
    action: <Action />,
  }));

  const pageSize = 10;
  const greenButtonText = "Add New Role";

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] w-[140vh] relative">
        {role.length > 0 ? (
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
