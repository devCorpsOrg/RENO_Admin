import { useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";

const AddNewCategory = ({ setExpand, setActiveTab }) => {
  setExpand("marketPlace");
  setActiveTab("catagoryManagement");
  const head = "Add New Category";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", title);
    images.forEach((image, index) => {
      formData.append(`pic${index}`, image);
    })

    try{
      axios.post("/API", formData)
      .then((response) => {
        setTitle("");
        setImages([]);
      })
    }catch(err){
      console.log("Form Not submitted", err);
    }
  };

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push({
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

      <div className=" ml-72 mb-10 relative" style={{ marginTop: "70px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginRight: 0, marginLeft: 920 }}>
            <button
              className="rounded mt-10"
              style={{
                backgroundColor: "black",
                width: "130px",
                height: "47px",
                color: "white",
              }}
              type="submit"
            >
              Cancel
            </button>

            <button
              className="rounded mt-10"
              style={{
                backgroundColor: "rgba(153, 190, 17, 0.831)",
                width: "130px",
                height: "47px",
                color: "white",
                marginLeft: "30px",
              }}
              type="submit"
            >
              Save
            </button>
          </div>
          <label className="grid mt-5">
             Category Name
            <input
              type="text"
              placeholder="Enter Category Name"
              id="title"
              className="rounded outline-none"
              style={{
                height: "50px",
                width: "1210px",
                paddingLeft: "10px",
                border: "2px solid 	#e6f7fe",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <div>
            <label className="grid mt-5" style={{ fontSize: "15px" }}>
              Category Icon
              <input
                class="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer mt-3 rounded appearance-none placeholder-transparent"
                style={{ border: "2px solid #e6f7fe", width: "450px" }}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                placeholder=""
              />
            </label>
          </div>
          <div style={{ width: "600px", marginTop:"10px" }}>
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

          <button
            className="rounded mt-10"
            style={{
              backgroundColor: "rgba(153, 190, 17, 0.831)",
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit"
          >
            Save
          </button>
          <button
            className="rounded mt-10"
            style={{
              backgroundColor: "black",
              width: "170px",
              height: "55px",
              color: "white",
              marginLeft: "30px",
            }}
            type="submit"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
