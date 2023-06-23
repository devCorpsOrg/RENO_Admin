import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { pic } from "../Assets/index";
import Action from "./Action";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { MPM_review } from "../../User_Management/features/userSlice";
import cookie from "js-cookie";

const Photo = ({ pic_url }) => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={pic_url} alt="Photo" />
    </div>
  );
};

const ReviewManagement = ({ setActiveTab, setExpand }) => {
  const head = "Review Management";
  // setExpand("marketPlace");
  setActiveTab("reviewManagement");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const reviewData = useSelector((state) => state.userManagement.mpm_review);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(MPM_review());
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
      header: "User Name",
      accessor: "username",
    },
    {
      header: "Reviews",
      accessor: "reviews",
    },
    {
      header: "Amount",
      accessor: "amount",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  // console.log("This is review data", reviewData.fields);
  const data = reviewData.map((user) => ({
    photo: <Photo />,
    productname: user.fields.prod_name,
    username: user.fields.reviewer_name,
    reviews: user.fields.review,
    amount: `$${user.fields.amt}`,
    action: (
      <Action
        reviews={user.fields.review}
        prodId={user.pk}
        prodName={user.fields.prod_name}
        prodPicUrl={user.fields.pic_url}
        // prodReview={user.fields.review}
        prodUserName={user.fields.reviewer_name}
        prodRate={user.fields.amt}
      />
    ),
  }));

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
        {reviewData.length > 0 ? (
          <Table columns={columns} data={data} pageSize={pageSize} />
        ) : (
          <>
            <Table columns={columns} data={data} pageSize={pageSize} />
            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;
