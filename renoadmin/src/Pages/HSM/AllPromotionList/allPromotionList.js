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

const Action = ({ promId, promName, category, inventory, rate, details }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };
  const handleEditClick = () =>{
    const data = {
      name:promName,
      category:category,
      inventory:inventory,
      rate:rate,
      details:details
    }
    navigate('/home/editPromotion', {state:data})
  }
  const handleConfirmDelete = () => {
    dispatch(DeletePromotion(promId))
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
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={edit} onClick={handleEditClick} alt="edit" />
      <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {promName}?
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

const AllProjects = ({ setActiveTab, setExpand }) => {
  const navigate = useNavigate();
  setExpand("homeService");
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
      header: "Photo",
      accessor: "photo",
    },
    {
      header: "Product Name",
      accessor: "productname",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Inventory",
      accessor: "inventory",
    },
    {
      header: "Pricing",
      accessor: "pricing",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  console.log(promotionData);
  const data = promotionData.map((user) => ({
    photo: <Photo picUrl={user.pic} />,
    productname: user.prod_name,
    category: user.prod_category,
    inventory: `${user.inv_count} items`,
    pricing: `$${user.rate}`,
    action: <Action promId={user.prod_id} promName={user.prod_name} category={user.prod_category} inventory={user.inv_count} rate={user.rate} details={user.project_details}  />,
  }));

  const greenButtonText = "ADD NEW PROMOTIONS";

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
        {promotionData.length > 0 ? (
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

export default AllProjects;
