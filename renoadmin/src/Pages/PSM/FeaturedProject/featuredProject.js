import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import {
  featuredProjects,
  DeleteProject,
} from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";

const Action = ({ projId, projName, category, rate, type }) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleClick = () => {
    const data = {
      name: projName,
      category: category,
      rate: rate,
      type: type,
    };
    Navigate("/home/editShowcase", { state: data });
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteProject(projId))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };
  const roles = cookie.get("role");
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      {roles === "admin" || roles === "editor" ? (
        <>
          <img src={edit} onClick={handleClick} alt="edit" />
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
        </>
      ) : (
        "Not Accessible"
      )}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {projName}?
              </p>
              <div className="p-5">
                <Button onClick={handleConfirmDelete} color="error" autoFocus>
                  Delete
                </Button>
                <Button onClick={handleCancelDelete} color="inherit">
                  Cancel
                </Button>
              </div>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

const Photo = ({ picUrl }) => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={picUrl} alt="Photo" />
    </div>
  );
};

const FeaturedProject = ({ setActiveTab, setExpand }) => {
  const head = "Featured Project";

  // setExpand("showcaseManagement");
  setActiveTab("featuredProject");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const featuredData = useSelector(
    (state) => state.userManagement.featuredproj
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(featuredProjects());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

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
      header: "Reviews",
      accessor: "reviews",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  const data = featuredData.map((user) => ({
    photo: <Photo picUrl={user.pic} />,
    projectname: user.proj_name,
    category: user.proj_category,
    rate: `$ ${user.rate}`,
    reviews: `${user.review}k reviews`,
    action: (
      <Action
        projId={user.proj_id}
        projName={user.proj_name}
        category={user.proj_category}
        rate={user.rate}
        type={user.project_type}
      />
    ),
  }));

  const blackButtonText = "Export All";

  // Number of Pages to be display on a single page.
  const pageSize = 4;

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      {loading ? (
        <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      <div className=" ml-72 mt-28 h-[85vh] w-[140vh] relative">
        {featuredData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            blackButtonText={
              <a href="http://139.59.236.50:8000/exportfeaturedprod?file_format=csv">
                {blackButtonText}
              </a>
            }
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              blackButtonText={
                <a href="http://139.59.236.50:8000/exportfeaturedprod?file_format=csv">
                  {blackButtonText}
                </a>
              }
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

export default FeaturedProject;
