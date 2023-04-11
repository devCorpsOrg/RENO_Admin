import React, { useState } from "react";

const Configuration = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-row w-full h-full justify-center sm:justify-start items-center m-3">
      <form action="submit" className="w-full sm:w-2/3 px-5">
        <h2 className="font-semibold text-2xl mb-10">
          Configuration and Settings
        </h2>
        <div className="flex flex-col sm:flex-row mb-4 w-full gap-5">
          <div className="mb-2 w-full sm:w-1/2">
            <span className="mr-2 w-32 inline-block">Site Name</span>
            <input
              type="text"
              name="siteName"
              placeholder="Enter Site Name"
              className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <span className="mr-2 w-32 inline-block">Portal URL</span>
            <input
              type="text"
              name="portalUrl"
              placeholder="Enter Portal URL"
              className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mb-4 gap-5">
          <div className="mb-2 w-full sm:w-1/2">
            <span className="mr-2 w-32 inline-block">Admin Email</span>
            <input
              type="email"
              name="adminEmail"
              placeholder="Enter Admin Email"
              className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <span className="mr-2 w-32 inline-block">Support Mail</span>
            <input
              type="email"
              name="supportMail"
              placeholder="Enter Support Mail"
              className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
            />
          </div>
        </div>
        <div className="mb-4">
          <span>SMTP Details</span>
          <textarea
            name="smtpDetails"
            placeholder="Enter Details"
            className="h-32 p-3 w-full border rounded-md border-blue-100 focus:border-blue-200"></textarea>
        </div>
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="bg-lime-500 hover:bg-lime-700 text-white font-bold w-[20vh] h-[7vh] py-2 px-4 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Configuration;
