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

const Action = ({ catId, catName }) => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/home/editCategory");
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${catName}?`)) {
      dispatch(DeleteCategory(catId))
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        }); // Dispatch deleteUser action
    }
  };
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img onClick={handleClick} src={edit} alt="edit" />
      <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
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
  setExpand("marketPlace");
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
                <a href="http://139.59.236.50:8000/exportcategories">
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

export default AllProducts;
