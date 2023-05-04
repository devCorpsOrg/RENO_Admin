import { useDebugValue, useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { addNewPromotion } from "../../User_Management/features/userSlice";
import { useDispatch } from "react-redux";

const AddPromotion = ({ setExpand, setActiveTab }) => {
  setExpand("homeService");
  setActiveTab("promotionManagement");
  const head = "Add New Promotion";
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pack, setPack] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [promotion, setPromotion] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("prod_name", title);
    formData.append("project_details", content);
    formData.append("prod_category", category);
    formData.append("promotion", promotion);
    formData.append("rate", pack);
    images.forEach((image, index) => {
      formData.append(`pic`, image);
    });

    dispatch(addNewPromotion(formData));
  };

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handlePromotionChange = (event) => {
    setPromotion(event.target.value);
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className=" ml-80 mb-10 relative" style={{ marginTop: "120px" }}>
        <form onSubmit={handleSubmit}>
          <label className="grid mt-5">
            Promotion Title
            <input
              type="text"
              placeholder="Enter Promotion Title"
              id="title"
              className="rounded w-[100vh] outline-none"
              style={{
                height: "50px",
                paddingLeft: "10px",
                border: "2px solid 	#e6f7fe",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <div className="grid grid-cols-2 w-[98vh] gap-5 mt-5">
            <label className="grid">
              Catagory
              <select
                id="label"
                name="label"
                className="outline-none w-[50vh] rounded"
                style={{
                  height: "50px",
                  // width: "590px",
                  paddingLeft: "5px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={category}
                onChange={handleCategoryChange}>
                <option value="">Select Catagory</option>
                <option value="personal">Admin</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="grid">
              Package
              <input
                type="text"
                value={pack}
                className="outline-none w-[50vh] rounded"
                placeholder="$000.00"
                style={{
                  height: "50px",
                  // width: "586px",
                  paddingLeft: "10px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                onChange={(event) => setPack(event.target.value)}
                required
              />
            </label>
            <label className="grid">
              No Of Promotion
              <select
                id="label"
                name="label"
                className="outline-none w-[50vh] rounded"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={promotion}
                onChange={handlePromotionChange}>
                <option value="">No of Promotion</option>
                <option value="personal">Admin</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="grid">
              Photos
              <input
                className="w-[50vh]"
                style={{
                  height: "50px",
                  // width: "590px",
                  paddingLeft: "0px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                class="w-[50vh] file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer mt-3 rounded appearance-none placeholder-transparent"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                placeholder=""
                required
              />
            </label>
          </div>

          <div style={{ marginLeft: "625px", width: "600px" }}>
            {images && images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)} // replace with your image source
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

          <label className="grid mt-5">
            Details
            <textarea
              id="content"
              placeholder="Enter Details"
              className="rounded outline-none w-[100vh] pt-2"
              style={{
                height: "170px",
                // width: "1210px",
                border: "2px solid #e6f7fe",
                paddingLeft: "10px",
                paddingTop: "20px",
                fontSize: "15px",
                marginTop: "5px",
              }}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
            />
          </label>
          {/* <div> */}
          <button
            className="rounded mt-10 bg-lime-600 hover:bg-lime-700"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit">
            Publish
          </button>
          <button
            className="rounded mt-10 bg-black hover:bg-gray-800"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
              marginLeft: "30px",
            }}
            type="submit">
            Draft
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default AddPromotion;
