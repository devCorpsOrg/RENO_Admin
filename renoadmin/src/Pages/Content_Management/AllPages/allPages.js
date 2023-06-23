import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, editIcon } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allPages } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import { DeletePage } from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";

const Action = ({ pageid, pagename, content }) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleEdit = () => {
    const data = {
      pagename: pagename,
      content: content,
    };
    Navigate("/home/editPage", { state: data });
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeletePage(pageid))
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
          <img src={editIcon} onClick={handleEdit} alt="Edit" />
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
                Are you sure you want to delete {pagename}?
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

const AllPages = ({ setActiveTab }) => {
  setActiveTab("contentManagement");
  const Navigate = useNavigate();
  const GreenClicked = () => {
    Navigate("/Home/createNewPage");
  };
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const pageData = useSelector((state) => state.userManagement.allpages);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(allPages());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

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

  const Data = pageData.map((user) => ({
    pagename: user.pagename,
    action: (
      <Action
        pageid={user.pageid}
        pagename={user.pagename}
        content={user.content}
      />
    ),
  }));

  const pageSize = 7;
  const greenButtonText = "Create New Page";
  const head = "All Pages";

  const roles = cookie.get("role");

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
        {pageData.length > 0 ? (
          <Table
            columns={columns}
            data={Data}
            pageSize={pageSize}
            greenButtonText={
              roles === "admin" || roles === "editor" ? greenButtonText : ""
            }
            greenClicked={GreenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={Data}
              pageSize={pageSize}
              greenButtonText={
                roles === "admin" || roles === "editor" ? greenButtonText : ""
              }
              greenClicked={GreenClicked}
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

export default AllPages;
