import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import {
  DeleteMember,
  MPM_allmembers,
} from "../../User_Management/features/userSlice";

const Action = ({ memberName, memberId }) => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/home/editMember");
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${memberName}?`)) {
      dispatch(DeleteMember(memberId)); // Dispatch deleteUser action
    }
  };
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img onClick={handleClick} src={edit} alt="edit" />
      <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
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

const AllMember = ({ setActiveTab, setExpand }) => {
  const head = "All Members";
  setExpand("marketPlace");
  setActiveTab("allMambers");
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/addShowcase");
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const memberData = useSelector(
    (state) => state.userManagement.mpm_allmembers
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(MPM_allmembers());
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
      header: "Member Name",
      accessor: "membername",
    },
    {
      header: "Contact No",
      accessor: "contact",
    },
    {
      header: "Internal Note",
      accessor: "internalnote",
    },
    {
      header: "Inventory",
      accessor: "inventory",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];
  console.log(memberData);

  const data = memberData.map((user) => ({
    photo: <Photo picUrl={user.fields.pic_url} />,
    membername: user.fields.member_name,
    contact: `+65 ${user.fields.phone}`,
    internalnote: user.fields.note,
    inventory: `${user.fields.inv_count} items`,
    action: <Action memberId={user.pk} memberName={user.fields.member_name} />,
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
      <div className=" ml-72 mt-28 h-[85vh] w-[140vh] relative">
        {memberData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            blackButtonText={
              <a href="http://139.59.236.50:8000/exportproducts?file_format=csv">
                {blackButtonText}
              </a>
            }
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

export default AllMember;
