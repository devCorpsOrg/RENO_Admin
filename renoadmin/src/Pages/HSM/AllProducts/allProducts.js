import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HSM_allProduct } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";

const Action = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/home/editProduct");
  };
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={edit} onClick={handleClick} alt="edit" />
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

const AllProduct = () => {
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

  const data = productData.map((user) => ({
    photo: <Photo />,
    productname: user.fields.name,
    category: user.fields.category,
    productcategory: user.fields.proj_category,
    inventory: `${user.fields.rate} items`,
    package: `$${user.fields.inv_count}`,
    purchaseditem: `${user.fields.net_purchase_item_count} items`,
    action: <Action />,
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
            blackButtonText={blackButtonText}
            greenButtonText={greenButtonText}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              blackButtonText={blackButtonText}
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
