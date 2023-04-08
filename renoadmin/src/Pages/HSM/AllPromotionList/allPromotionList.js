import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";

const Action = () => {
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={edit} alt="edit" />
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
    header: "Category",
    accessor: "category",
  },
  {
    header: "Inventory",
    accessor: "inventory",
  },
  {
    header: "Pricing",
    accessor: "pricing",
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
    category: "Electrical",
    inventory: `${5} items`,
    pricing: `$${130}`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    productname: "Parallel Kitechen",
    category: "Electrical",
    inventory: `${5} items`,
    pricing: `$${130}`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    productname: "Parallel Kitechen",
    category: "Electrical",
    inventory: `${5} items`,
    pricing: `$${130}`,
    action: <Action />,
  },
];

const greenButtonText = "ADD NEW PROMOTIONS";

// Number of Pages to be display on a single page.
const pageSize = 4;

const allProjects = () => {
  return (
    <Table
      columns={columns}
      data={data}
      pageSize={pageSize}
      greenButtonText={greenButtonText}
    />
  );
};

export default allProjects;
