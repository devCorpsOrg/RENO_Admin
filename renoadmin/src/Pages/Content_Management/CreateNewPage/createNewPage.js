import React, { useState } from "react";

const CreateNewPage = () => {
  const [selectedFile, setSelectedFile] = useState(null); // state to store the selected file

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]); // update selected file state
  };

  const fileUploadHandler = () => {
    // handle file upload logic here
    console.log(selectedFile);
  };

  return (
    <div className="w-full h-full p-7">
      <form action="submit" className="w-full">
        <div className="mb-5 w-full">
          <span className="mr-2 mb-2 w-32 inline-block">Page Title</span>
          <input
            type="text"
            name="siteName"
            placeholder="Enter Page Title"
            className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
          />
        </div>
        <div className="mb-5 w-full">
          <span className="mr-2 mb-2 w-32 inline-block">Page Content</span>
          <textarea
            type="text"
            name="siteContent"
            placeholder="Enter Page Content"
            className="h-[215px] p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
          />
        </div>
        <div className="flex flex-col mb-5 w-full">
          <span className="mr-2 text-xl mb-2 w-50 inline-block">
            Upload Media
          </span>
          <div className="flex flex-row w-[523px] border-gray-300 mb-5 rounded-md border-2">
            <input
              type="file"
              onChange={fileSelectedHandler}
              accept=".jpg,.jpeg,.png"
              className="w-full"
            />
            <button
              type="button"
              className="bg-[#2B2B2B] uppercase hover:bg-gray-500 text-white font-bold lg:w-[186px] xl:w-[200px] h-[7vh] py-2 px-4 rounded-md ml-2"
              onClick={fileUploadHandler}>
              Upload
            </button>
          </div>
          <ul className="list-disc pl-5 text-[#002858]">
            <li>Allowed banner image exitension .jpg | .jpeg | .png</li>
            <li>
              Max banner image file size{" "}
              <span className="text-[#EE4B4B]">5MB</span>
            </li>
            <li>
              Recommended Banner image size{" "}
              <span className="text-[#EE4B4B]">1900px * 700px</span>
            </li>
          </ul>
        </div>
        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-700 text-white font-bold w-full lg:w-[20vh] xl:w-[25vh] h-[7vh] py-2 px-4 rounded-sm">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewPage;
