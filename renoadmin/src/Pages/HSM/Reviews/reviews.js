import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { images } from "../Assets/index";
import Action from "./Action";
import TopHeader from "../../../UI/TopHeader/TopHeader";

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
    action: <Action reviews={"This is the first review."} />,
  },
  {
    photo: <Photo />,
    productname: "Parallel Kitechen",
    username: "John Doe",
    reviews:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    amount: `$${130}`,
    action: <Action reviews={"This a the second review"} />,
  },
];

// Number of Pages to be display on a single page.
const pageSize = 4;

const allProjects = () => {
  const head = "Reviews";
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] w-[140vh] relative">
        <Table columns={columns} data={data} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default allProjects;
