import React from "react";
import Cookies from "js-cookie";

const TopHeader = (props) => {
  const name = Cookies.get("username");
  const role = Cookies.get("role");
  const pic = Cookies.get("pic");
  // console.log(name, role, pic);

  return (
    <div
      className="ml-72 w-full h-20 fixed bg-white"
      style={{ marginLeft: "17.3rem", zIndex:"1000 !important" }}>
      <div className="ml-3 flex h-20 items-center justify-between">
        <div className="text-2xl font-semibold">{props.head}</div>
        <div
          className="flex h-20 items-center cursor-pointer"
          style={{ marginRight: "20rem" }}>
          <img
            src={pic}
            alt=""
            style={{
              height: "60px",
              marginRight: "15px",
              borderRadius: "50%",
              width: "60px"
            }}
          />
          <div>
            <div className="text-xl font-bold">{name}</div>
            <div className="text-sm font-semibold">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
