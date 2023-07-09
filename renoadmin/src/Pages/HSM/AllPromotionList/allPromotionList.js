import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import {
  DeletePromotion,
  HSM_promotion,
} from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";


const Action = ({ prodId, name, category, expiry, offer_by, offer_val }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };
  const handleEditClick = () => {
    const data = {
      prodId: prodId,
      name: name,
      category: category,
      expiry: expiry,
      offer_by: offer_by,
      offer_val: offer_val,
    };
    navigate("/home/editPromotion", { state: data });
  };
  console.log("This is the name", name);
  const handleConfirmDelete = () => {
    dispatch(DeletePromotion(prodId))
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
      <img src={edit} onClick={handleEditClick} alt="edit" />
      <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
      </>
      ) : "Not Accessible"}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">{`Are you sure you want to delete ${name}?`}</p>
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

const AllProjects = ({ setActiveTab, setExpand }) => {
  const navigate = useNavigate();
  // setExpand("homeService");
  setActiveTab("promotionManagement");
  const greenClicked = () => {
    navigate("/home/addPromotion");
  };
  const head = "All Promotion List";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const promotionData = useSelector(
    (state) => state.userManagement.hsm_promotion
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(HSM_promotion());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  const columns = [
    {
      header: "Product ID",
      accessor: "productid",
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Expiry Date",
      accessor: "expirydate",
    },
    {
      header: "Offer By",
      accessor: "offerby",
    },
    {
      header: "Offer Value",
      accessor: "offervalue",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  console.log("This is the promotion data :", promotionData);
  const data = promotionData.map((user) => ({
    productid: user.fields.prod_id,
    name: user.fields.name,
    category: user.fields.catg,
    expirydate: user.fields.expiry, //Add expiry date when get from backend API
    offerby: user.fields.offer_by,
    offervalue: user.fields.offer_val,
    action: (
      <Action
        prodId={user.fields.prod_id}
        name={user.fields.name}
        category={user.fields.catg}
        expiry={user.fields.expiry}
        offer_by={user.fields.offer_by}
        offer_val={user.offer_val}
      />
    ),
  }));

  const greenButtonText = "ADD NEW PROMOTIONS";

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
        {promotionData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenButtonText={roles === "admin" || roles === "editor" ? greenButtonText : ""}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
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

export default AllProjects;
