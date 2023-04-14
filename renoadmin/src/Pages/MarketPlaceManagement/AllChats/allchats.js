import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import Status from "./Status";

const Action = () => {
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={deleteIcon} alt="Delete" />
    </div>
  );
};

const Photo = () => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={images} alt="Photo" />
    </div>
  );
};

const columns = [
  {
    header: "Photo",
    accessor: "photo",
  },
  {
    header: "Requester",
    accessor: "requester",
  },
  {
    header: "Subject",
    accessor: "subject",
  },
  {
    header: "Message",
    accessor: "message",
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
    photo: <Photo />,
    requester: "Anges",
    subject: "Delivery Status",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    status: <Status value={"Solved"} />,
    action: <Action />,
  },
  {
    photo: <Photo />,
    requester: "Anges",
    subject: "Delivery Status",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    status: <Status value={"Open"} />,
    action: <Action />,
  },
  {
    photo: <Photo />,
    requester: "Anges",
    subject: "Delivery Status",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    status: <Status value={"Pending"} />,
    action: <Action />,
  },
  {
    photo: <Photo />,
    requester: "Anges",
    subject: "Delivery Status",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    status: <Status value={"Pending"} />,
    action: <Action />,
  },
];

// Number of Pages to be display on a single page.
const pageSize = 4;

const AllProjects = () => {
  const head = "All Chats and Deals";
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] min-w-[80%] relative">
        <Table columns={columns} data={data} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default AllProjects;
