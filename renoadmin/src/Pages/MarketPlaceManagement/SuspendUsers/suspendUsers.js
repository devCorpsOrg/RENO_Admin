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
  MPM_suspended,
} from "../../User_Management/features/userSlice";

const Action = ({ memberName, memberId }) => {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${memberName}?`)) {
      dispatch(DeleteMember(memberId)); // Dispatch deleteUser action
    }
  };
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      <img src={edit} alt="edit" />
      <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />{" "}
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

const SuspendUser = () => {
  const head = "Suspended Users";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const suspendData = useSelector(
    (state) => state.userManagement.mpm_suspended
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(MPM_suspended());
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

  const data = suspendData.map((user) => ({
    photo: <Photo />,
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
      <div className=" ml-72 mt-28 h-[85vh] min-w-[84%] relative">
        {suspendData.length > 0 ? (
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

export default SuspendUser;
