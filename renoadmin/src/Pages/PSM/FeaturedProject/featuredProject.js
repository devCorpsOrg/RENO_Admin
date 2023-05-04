import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { featuredProjects } from "../../User_Management/features/userSlice";

const Action = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/home/editShowcase");
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

const FeaturedProject = () => {
  const head = "Featured Project";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const featuredData = useSelector(
    (state) => state.userManagement.featuredproj
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(featuredProjects());
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
      header: "Project Name",
      accessor: "projectname",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Rate",
      accessor: "rate",
    },
    {
      header: "Reviews",
      accessor: "reviews",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  const data = featuredData.map((user) => ({
    photo: <Photo />,
    projectname: user.proj_name,
    category: user.proj_category,
    rate: `$ ${user.rate}`,
    reviews: `${user.review}k reviews`,
    action: <Action />,
  }));

  const blackButtonText = "Export All";

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
      <div className=" ml-72 mt-28 h-[85vh] min-w-[140vh] relative">
        {featuredData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            blackButtonText={blackButtonText}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              blackButtonText={blackButtonText}
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

export default FeaturedProject;
