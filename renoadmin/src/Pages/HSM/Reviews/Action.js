import React, { useState } from "react";
import { deleteIcon, view, images } from "../Assets/index";

// For the API integration all the data could be get from the API throught props
// When a user click on the view button this popup will should with detailed reviews.
// This is work seperately for every field of the table by using Props.

const Action = ({ reviews }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleViewClick = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className="w-6 h-6 flex gap-3 cursor-pointer">
        <img src={view} onClick={handleViewClick} alt="View" />
        <img src={deleteIcon} alt="Delete" />
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-7 w-[740px] h-[676px] relative">
            <div className="mb-5">
              <h3 className="font-bold text-xl">Detailed Review</h3>
              <button
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
                onClick={() => setShowPopup(false)}>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="x w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M14.35 5.65a.5.5 0 0 1 0 .7L10.71 10l3.64 3.65a.5.5 0 0 1-.7.7L10 10.71l-3.65 3.64a.5.5 0 0 1-.7-.7L9.29 10 5.65 6.35a.5.5 0 0 1 .7-.7L10 9.29l3.65-3.64a.5.5 0 0 1 .7 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col w-full justify-start">
              <div className="flex flex-row w-full justify-start items-center mb-5">
                <img
                  className="w-36 h-36 rounded mr-4"
                  src={images}
                  alt="Product"
                />
                <div>
                  <h2 className="font-medium text-xl mb-2">
                    Parallel Kitechen
                  </h2>
                  <p className="text-gray-700 font-semibold mb-2">$130</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-gray-500">Reviewed By </span>
                <p className="font-bold text-md mt-3 mb-5">John Doe</p>
              </div>
              <div>
                <span className="text-gray-500">Review</span>
                <p className="mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Action;
