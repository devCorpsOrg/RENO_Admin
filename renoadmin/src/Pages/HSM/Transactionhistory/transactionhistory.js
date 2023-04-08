import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";

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
    header: "Product Name",
    accessor: "productname",
  },
  {
    header: "Date / Time",
    accessor: "datetime",
  },
  {
    header: "Supplier",
    accessor: "supplier",
  },
  {
    header: "Discription",
    accessor: "discription",
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
    datetime: "3/13/2023 10:00 am",
    supplier: "John Doe",
    discription: "Service fee",
    amount: `$${130}`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    productname: "Parallel Kitechen",
    datetime: "3/13/2023 10:00 am",
    supplier: "John Doe",
    discription: "Service fee",
    amount: `$${130}`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    productname: "Parallel Kitechen",
    datetime: "3/13/2023 10:00 am",
    supplier: "John Doe",
    discription: "Service fee",
    amount: `$${130}`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    productname: "Parallel Kitechen",
    datetime: "3/13/2023 10:00 am",
    supplier: "John Doe",
    discription: "Service fee",
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
