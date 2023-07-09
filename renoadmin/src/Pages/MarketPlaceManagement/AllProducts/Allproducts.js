import React from "react";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, plumbing } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCategory,
  MPM_category,
} from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";

const Action = ({ catId, catName }) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleClick = () => {
    console.log(catName);
    const data = {
      catname: catName,
    };
    Navigate("/home/editCategory", { state: data });
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteCategory(catId))
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
          <img onClick={handleClick} src={edit} alt="edit" />
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
              <p className="pt-5">Are you sure you want to delete {catName}?</p>
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

const Photo = (pic_url) => {
  if (pic_url) {
    return (
      <div>
        <img className="w-14 h-14 rounded" src={pic_url} alt="Photo" />
      </div>
    );
  } else {
    return (
      <div>
        <img className="w-14 h-14 rounded" src={plumbing} alt="Photo" />
      </div>
    );
  }
};

const AllProducts = ({ setActiveTab, setExpand }) => {
  const head = "All Products";
  // setExpand("marketPlace");
  setActiveTab("catagoryManagement");
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/addNewCategory");
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const productData = useSelector((state) => state.userManagement.mpm_category);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(MPM_category());
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
      header: "Category Name",
      accessor: "category",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];
  console.log(productData);

  const data = productData.map((user) => ({
    photo: <Photo prop={user.fields.pic_url} />,
    category: user.fields.prod_category,
    action: <Action catId={user.pk} catName={user.fields.prod_category} />,
  }));

  const blackButtonText = "Export All";
  const greenButtonText = "Add New";

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
      <div className=" ml-72 mt-28 h-[85vh] min-w-[135%] relative">
        {productData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            blackButtonText={
              <a href="http://139.59.236.50:8000/exportcategories">
                {blackButtonText}
              </a>
            }
            greenButtonText={roles === "admin" || roles === "editor" ? greenButtonText : ""}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              blackButtonText={
                <a href="http://139.59.236.50:8000/exportcategories">
                  {blackButtonText}
                </a>
              }
              greenButtonText={roles === "admin" || roles === "editor" ? greenButtonText : ""}
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

export default AllProducts;
