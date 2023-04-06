import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, editIcon } from "./Assets/index";

const Action = () => {
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={editIcon} alt="Edit" />
      <img src={deleteIcon} alt="Delete" />
    </div>
  );
};

const columns = [
  {
    header: "Page Name",
    accessor: "pagename",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const Data = [
  {
    pagename: "Home Page",
    action: <Action />,
  },
  {
    pagename: "About us Page",
    action: <Action />,
  },
  {
    pagename: "Contact Page",
    action: <Action />,
  },
];

const pageSize = 3;
const buttonText = "Create New Page";

const allPages = () => {
  return (
    <div>
      <Table
        columns={columns}
        data={Data}
        pageSize={pageSize}
        buttonText={buttonText}
      />
    </div>
  );
};

export default allPages;
