import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, editIcon } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";

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
const greenButtonText = "Create New Page";
const head = "All Pages";

const allPages = () => {
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] w-[140vh] relative">
        <Table
          columns={columns}
          data={Data}
          pageSize={pageSize}
          greenButtonText={greenButtonText}
        />
      </div>
    </div>
  );
};

export default allPages;
