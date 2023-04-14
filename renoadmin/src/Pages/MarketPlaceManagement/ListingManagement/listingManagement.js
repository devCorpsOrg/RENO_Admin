import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, electrical } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";

const Action = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/home/editListing");
  };
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img onClick={handleClick} src={edit} alt="edit" />
      <img src={deleteIcon} alt="Delete" />
    </div>
  );
};

const Photo = () => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={electrical} alt="Photo" />
    </div>
  );
};

const columns = [
  {
    header: "Photo",
    accessor: "photo",
  },
  {
    header: "Service Name",
    accessor: "service",
  },
  {
    header: "Discription",
    accessor: "discription",
  },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const data = [
  {
    photo: <Photo />,
    service: "Electrical Services",
    discription: "Lorem Ipsum is simply dummy text of the printing",
    price: `$${123}`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    service: "Electrical Services",
    discription: "Lorem Ipsum is simply dummy text of the printing",
    price: `$${123}`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    service: "Electrical Services",
    discription: "Lorem Ipsum is simply dummy text of the printing",
    price: `$${123}`,
    action: <Action />,
  },
];

const greenButtonText = "Add New Listing";

// Number of Pages to be display on a single page.
const pageSize = 4;

const AllProjects = () => {
  const head = "All Members";
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/addListing");
  };
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] min-w-[94%] relative">
        <Table
          columns={columns}
          data={data}
          pageSize={pageSize}
          greenButtonText={greenButtonText}
          greenClicked={greenClicked}
        />
      </div>
    </div>
  );
};

export default AllProjects;
