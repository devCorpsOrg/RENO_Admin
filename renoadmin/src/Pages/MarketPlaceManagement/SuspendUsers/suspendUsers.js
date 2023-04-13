import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";

const Action = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/home/editShowcase");
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
    header: "Member Name",
    accessor: "membername",
  },
  {
    header: "Contact No",
    accessor: "contact",
  },
  {
    header: "Internal Note",
    accessor: "internalnote",
  },
  {
    header: "Inventory",
    accessor: "inventory",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const data = [
  {
    photo: <Photo />,
    membername: "John Doe",
    contact: `+65 ${12345678}`,
    internalnote: "Lorem Ipsum is simply dummy text of the printing",
    inventory: `${5} items`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    membername: "John Doe",
    contact: `+65 ${12345678}`,
    internalnote: "Lorem Ipsum is simply dummy text of the printing",
    inventory: `${5} items`,
    action: <Action />,
  },
  {
    photo: <Photo />,
    membername: "John Doe",
    contact: `+65 ${12345678}`,
    internalnote: "Lorem Ipsum is simply dummy text of the printing",
    inventory: `${5} items`,
    action: <Action />,
  },
];

const blackButtonText = "Export All";

// Number of Pages to be display on a single page.
const pageSize = 4;

const AllProjects = () => {
  const head = "Suspended Users";
  const Navigate = useNavigate();
  const greenClicked = () => {
    // Navigate("/home/addShowcase");
  };
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] min-w-[84%] relative">
        <Table
          columns={columns}
          data={data}
          pageSize={pageSize}
          blackButtonText={blackButtonText}
          greenClicked={greenClicked}
        />
      </div>
    </div>
  );
};

export default AllProjects;
