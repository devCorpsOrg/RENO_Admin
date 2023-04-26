import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, editIcon } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Action = () => {
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={editIcon} alt="Edit" />
      <img src={deleteIcon} alt="Delete" />
    </div>
  );
};

const AllPages = () => {
  const Navigate = useNavigate();
  const GreenClicked = () => {
    Navigate("/Home/createNewPage");
  };

  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    axios
      .get("/pages")
      .then((response) => {
        console.log(response.data);
        setPageData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      header: "Page Name",
      accessor: "pagename",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  const data = pageData.map((user) => ({
    pagename: user.pagename,
    action: <Action />,
  }));

  const pageSize = 6;
  const greenButtonText = "Create New Page";
  const head = "All Pages";

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-28 h-[85vh] min-w-[140vh] relative">
        {pageData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenButtonText={greenButtonText}
            greenClicked={GreenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={greenButtonText}
              greenClicked={GreenClicked}
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

export default AllPages;
