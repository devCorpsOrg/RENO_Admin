import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";

const projectBookings = () => {
  const head = "Bookings";
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className="flex relative ml-[60vh] flex-col justify-center items-center w-full h-screen">
        <h2 className="text-4xl font-bold text-gray-500 mb-4 ">Coming Soon</h2>
        <p className="text-xl text-gray-500">Stay tuned for updates!</p>
      </div>
    </div>
  );
};

export default projectBookings;
