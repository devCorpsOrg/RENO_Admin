import { useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";

const CreateNewPage = ({ setExpand, setActiveTab }) => {
  setActiveTab("contentManagement");
  const head = "Create New Page";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, content); // Do something with the data
    setTitle("");
    setContent("");
    setImages([]);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push({
        name: files[i].name,
        url: URL.createObjectURL(files[i]),
      });
    }
    setImages(uploadedImages);
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className=" ml-72 mt-20 relative" style={{ marginTop: "140px" }}>
        <form onSubmit={handleSubmit}>
          <label className="grid">
            Page Title
            <input
              type="text"
              placeholder="Enter Page Title"
              id="title"
              className="rounded outline-none"
              style={{
                height: "50px",
                width: "1230px",
                paddingLeft: "20px",
                border: "2px solid 	#e6f7fe",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label className="grid mt-5">
            Page Content
            <textarea
              id="content"
              placeholder="Enter Page Content"
              className="rounded outline-none pt-2"
              style={{
                height: "170px",
                width: "1230px",
                border: "2px solid #e6f7fe",
                paddingLeft: "20px",
                paddingTop: "20px",
                fontSize: "15px",
                marginTop: "5px",
              }}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>
          <div>
            <label className="grid mt-5" style={{ fontSize: "15px" }}>
              Upload Media
              <input
                class="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                style={{ border: "2px solid #e6f7fe", width: "350px" }}
                type="file"
                placeholder=""
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div style={{ width: "600px", marginTop: "10px" }}>
            {images && images.length > 0 && (
              <div className="grid grid-cols-6 gap-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url} // replace with your image source
                    alt={image.name} // replace with your image alt text
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }} // set width, height, object-fit, and margin-right styles
                  />
                ))}
              </div>
            )}
          </div>
          <div style={{ fontSize: "10px", marginTop: "8px" }}>
            <ul className="list-disc ml-3 text-gray-500">
              <li>Allowed banner image extension .jpg | .jpeg | .png</li>
              <li>
                Max banner image file size <a className="text-red-500">5MB</a>
              </li>
              <li>
                Recommended Banner image size{" "}
                <a className="text-red-500">1900px * 700px</a>
              </li>
            </ul>
          </div>
          <button
            className="rounded mt-10"
            style={{
              backgroundColor: "rgba(153, 190, 17, 0.831)",
              width: "130px",
              height: "55px",
              color: "white",
            }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPage;
