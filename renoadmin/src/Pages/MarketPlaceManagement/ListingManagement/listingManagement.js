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

const Action = ({ listId, listName }) => {
  const Navigate = useNavigate();
  const handleEditClick = () => {
    Navigate(`/home/editListing/?id={listId}`);
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${listName}?`)) {
      dispatch(DeleteListing(listId)); // Dispatch deleteUser action
    }
  };
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img onClick={handleEditClick} src={edit} alt="edit" />
      <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
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
  const head = "All Members";
  setExpand("marketPlace");
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
  console.log(listingData);
  const data = listingData.map((user) => ({
    photo: <Photo pic_url={user.pic_url} />,
    service: user.service,
    discription: user.desc,
    price: `$${user.rate}`,
    action: <Action listId={user.id} listName={user.service} />,
  }));

  const greenButtonText = "Add New Listing";

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
        {listingData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenButtonText={greenButtonText}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={greenButtonText}
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
