import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HSM_allProduct } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import { DeleteProduct } from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";

const Action = ({ prodId, prodName, category, productcategory, inv, pack, purchaseditem, details }) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleClick = () => {
    const data={
      name: prodName,
      category: category,
      productcategory: productcategory,
      inv: inv,
      pack: pack,
      purchaseditem:purchaseditem,
      details: details
    }
    Navigate("/home/editProduct", {state:data});
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteProduct(prodId))
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
      <img src={edit} onClick={handleClick} alt="edit" />
      <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {prodName}?
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

const AllProduct = ({ setActiveTab, setExpand }) => {
  // setExpand("homeService");
  setActiveTab("productList");

  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/addProduct");
  };
  const head = "All Products";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const productData = useSelector(
    (state) => state.userManagement.hsm_allproducts
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(HSM_allProduct());
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
      header: "Product Category",
      accessor: "productcategory",
    },
    {
      header: "Inventory",
      accessor: "inventory",
    },
    {
      header: "Package",
      accessor: "package",
    },
    {
      header: "Purchased Item",
      accessor: "purchaseditem",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];
  console.log(productData);
  const data = productData.map((user) => ({
    photo: <Photo picUrl={user.fields.pic_url} />,
    productname: user.fields.name,
    category: user.fields.category,
    productcategory: user.fields.proj_category,
    inventory: `${user.fields.rate} items`,
    package: `$${user.fields.inv_count}`,
    purchaseditem: `${user.fields.net_purchase_item_count} items`,
    action:       <Action
    prodId={user.pk}
    prodName={user.fields.name}
    category={user.fields.category}
    productcategory={user.fields.proj_category}
    inv={user.fields.inv_count}
    pack={user.fields.rate}
    purchaseditem={user.fields.net_purchase_item_count}
    details={user.fields.details}
  />,
  }));

  const blackButtonText = "Export All";
  const greenButtonText = "Add New Product";

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
        {productData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            blackButtonText={
              <a href="http://139.59.236.50:8000/exportproducts?file_format=csv">
                {blackButtonText}
              </a>
            }
            greenButtonText={greenButtonText}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              blackButtonText={
                <a href="http://139.59.236.50:8000/exportproducts?file_format=csv">
                  {blackButtonText}
                </a>
              }
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

export default AllProduct;
