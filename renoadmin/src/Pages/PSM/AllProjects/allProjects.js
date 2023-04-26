import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const AllProjects = () => {
  const head = "All Project";
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/addShowcase");
  };

  const [allProjects, setAllProjects] = useState([]);
  const url = "/projects";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setAllProjects(response.data);
        console.log(response.data); //Have to remove this at the end.
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      header: "Photo",
      accessor: "photo",
    },
    {
      header: "Project Name",
      accessor: "projectname",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Rate",
      accessor: "rate",
    },
    {
      header: "Project Type",
      accessor: "projecttype",
    },
    {
      header: "Reviews",
      accessor: "reviews",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  const data = allProjects.map((user) => ({
    photo: <Photo />,
    projectname: user.proj_name,
    category: user.proj_category,
    rate: `$${user.rate}`,
    projecttype: user.project_type,
    reviews: `${user.review}k reviews`,
    action: <Action />,
  }));

  const greenButtonText = "Add New Project";
  const blackButtonText = "Export All";
  const pageSize = 4; // Number of Pages to be display on a single page.

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] min-w-[86%] relative">
        {allProjects.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenButtonText={greenButtonText}
            blackButtonText={blackButtonText}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={greenButtonText}
              blackButtonText={blackButtonText}
              greenClicked={greenClicked}
            />
            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
