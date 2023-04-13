import React from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const Chatdetails = ({ setActiveTab, setExpand }) => {
  setActiveTab("helpDesk");
  setExpand("homeService");

  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}${ampm}`;
  }

  return (
    <div
      style={{
        position: "absolute",
        width: "391.5px",
        height: "753px",
        left: "1143px",
        top: "0px",
        background: "#FFFFFF",
        boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex justify-between ml-3 mr-3 mt-5">
        <div className="font-bold">Chat Details</div>
        <button className="font-bold">X</button>
      </div>

      <div className="ml-3 mr-3">
        <div className="flex h-20 items-center cursor-pointer" style={{}}>
          <img
            src="/images/profile.jpg"
            alt=""
            style={{
              height: "45px",
              marginRight: "15px",
              borderRadius: "50px",
            }}
          />
          <div>
            <div className="text-sm font-bold">Andre</div>
            <div className="text-xs text-gray-500 ">Status: Solved</div>
          </div>
        </div>
      </div>

      <div
        className="ml-3 mr-3 overflow-auto scrollbar-hide"
        style={{
          height: "550px",
          width: "380px",
          overflowX: "hidden",
          overflowY: "scroll",
        }}
      >
        <div style={{ width: "200px", paddingBottom: "15px" }}>
          <div
            className="flex items-center"
            style={{
              backgroundColor: "#8FC743",
              color: "white",
              borderRadius: "13px",
              fontSize: "14px",
              paddingLeft: "7px",
              width: "100%",
              boxSizing: "border-box",
              wordWrap: "break-word",
              paddingRight: "7px",
              paddingTop: "7px",
              paddingBottom: "7px",
              width: "fit-content",
              marginBottom: "5px",
            }}
          >
            Backend Side Messages
          </div>
          <div
            className="text-gray-500"
            style={{ fontSize: "12px", paddingLeft: "8px" }}
          >
            8:30 am
          </div>
        </div>

        <div style={{ width: "200px", paddingBottom: "70px" }}>
          <div
            className="flex items-center"
            style={{
              backgroundColor: "#2B2B2B",
              color: "white",
              borderRadius: "13px",
              fontSize: "14px",
              paddingLeft: "7px",
              width: "100%",
              boxSizing: "border-box",
              wordWrap: "break-word",
              paddingRight: "7px",
              paddingTop: "7px",
              paddingBottom: "7px",
              width: "fit-content",
              marginBottom: "5px",
              position: "absolute",
              right: 20,
            }}
          >
            Frontend Side Messages
          </div>
          <div
            className="text-gray-500"
            style={{ fontSize: "12px", paddingLeft: "100px", paddingTop:"40px", position:"absolute", right:25 }}
          >
            8:30 am
          </div>
        </div>
      </div>

      <div
        className="ml-3 mr-3 flex justify-between items-center"
        style={{ position: "absolute", bottom: 20 }}
      >
        <input
          className="bg-gray-200"
          style={{
            width: "320px",
            height: "40px",
            borderRadius: "60px",
            outline: "none",
            paddingLeft: "10px",
          }}
          type="text"
          placeholder="Type here..."
        />
        <button
          className="ml-4 rounded-full flex items-center justify-center bg-black"
          style={{ border: "1px solid", height: "30px", width: "30px" }}
        >
          <SendOutlinedIcon
            style={{ color: "white", transform: "rotate(-40deg)" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Chatdetails;
