import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, electrical } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import {
  DeleteListing,
  MPM_listing,
} from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";

const Action = ({ listId, listName, desc, price }) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleEditClick = () => {
    const data = {
      name: listName,
      desc: desc,
      price: price,
    };
    Navigate("/home/editListing", { state: data });
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteListing(listId))
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
          <img onClick={handleEditClick} src={edit} alt="edit" />
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
                Are you sure you want to delete {listName}?
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

const Photo = ({ pic_url }) => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={pic_url} alt="Photo" />
    </div>
  );
};

const ListingData = ({ setActiveTab, setExpand }) => {
  const head = "Listing Management";
  // setExpand("marketPlace");
  setActiveTab("listingManagement");
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/addListing");
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const listingData = useSelector((state) => state.userManagement.mpm_listing);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(MPM_listing());
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
      header: "Listing name",
      accessor: "service",
    },
    {
      header: "Seller",
      accessor: "seller",
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
  console.log(listingData);
  const data = listingData.map((user) => ({
    photo: <Photo pic_url={user.pic_url} />,
    service: user.service,
    seller: user.desc,
    price: `$${user.rate}`,
    action: (
      <Action
        listId={user.id}
        listName={user.service}
        desc={user.desc}
        price={user.rate}
      />
    ),
  }));

  const greenButtonText = "Add New Listing";

  // Number of Pages to be display on a single page.
  const pageSize = 4;
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
        {listingData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenButtonText={
              roles === "admin" || roles === "editor" ? greenButtonText : ""
            }
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={
                roles === "admin" || roles === "editor" ? greenButtonText : ""
              }
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

export default ListingData;
