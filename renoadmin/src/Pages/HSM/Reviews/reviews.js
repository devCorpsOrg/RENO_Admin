import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, view, images } from "../Assets/index";

const Action = () => {
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={view} alt="View" />
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
    header: "Product Name",
    accessor: "productname",
  },
  {
    header: "User Name",
    accessor: "username",
  },
  {
    header: "Reviews",
    accessor: "reviews",
  },
  {
    header: "Amount",
    accessor: "amount",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const data = [
  {
    photo: <Photo />,
    productname: "Parallel Kitechen",
    username: "John Doe",
    reviews:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    amount: `$${130}`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    productname: "Parallel Kitechen",
    username: "John Doe",
    reviews:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    amount: `$${130}`,
    action: <Action />,
  },
];

// Number of Pages to be display on a single page.
const pageSize = 4;

const allProjects = () => {
  return <Table columns={columns} data={data} pageSize={pageSize} />;
};

export default allProjects;
