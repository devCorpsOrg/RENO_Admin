import React from "react";
import Table from "../../UI/CommonTable/Table";
import { deleteIcon, view, edit } from "./Assets/index";

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

const data = [
  {
    serial: 1,
    name: "Rock",
    emailaddress: "DJ123@gmail.com",
    role: "Developer",
    status: "Assign",
    action: <Action />,
  },
  {
    serial: 1,
    name: "Rock",
    emailaddress: "DJ123@gmail.com",
    role: "Developer",
    status: "Assign",
    action: <Action />,
  },
  {
    serial: 1,
    name: "Rock",
    emailaddress: "DJ123@gmail.com",
    role: "Developer",
    status: "Assign",
    action: <Action />,
  },
  {
    serial: 1,
    name: "Rock",
    emailaddress: "DJ123@gmail.com",
    role: "Developer",
    status: "Assign",
    action: <Action />,
  },
];

const pageSize = 10;
const greenButtonText = "Add New Role";

const PMS = () => {
  return (
    <div>
      <Table
        columns={columns}
        data={data}
        pageSize={pageSize}
        greenButtonText={greenButtonText}
      />
    </div>
  );
};

export default PMS;
