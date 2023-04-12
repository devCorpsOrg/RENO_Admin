import React from "react";

const TopHeader = (props) => {
  return (
    <div
      className="ml-72 w-full h-20 fixed bg-white"
      style={{ marginLeft: "18rem" }}>
      <div className="ml-3 flex h-20 items-center justify-between">
        <div className="text-2xl font-semibold">{props.head}</div>
        <div
          className="flex h-20 items-center cursor-pointer"
          style={{ marginRight: "20rem" }}>
          <img
            src="/images/profile.jpg"
            alt=""
            style={{
              height: "60px",
              marginRight: "15px",
              borderRadius: "50px",
            }}
          />
          <div>
            <div className="text-xl font-bold">Andre</div>
            <div className="text-sm font-semibold">Super Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
