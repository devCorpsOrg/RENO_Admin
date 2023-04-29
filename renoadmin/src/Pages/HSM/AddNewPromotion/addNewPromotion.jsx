import { useDebugValue, useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios"
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
    formData.append("prod_name", title)
    formData.append("project_details", content)
    formData.append("prod_category", category)
    formData.append("promotion", promotion)
    formData.append("rate", pack)
    images.forEach((image, index) => {
      formData.append(`pic`, image)
    })
    

    dispatch(addNewPromotion(formData));
  
  };
  

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(
        (files[i]),
      );
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
              type="submit">
              Draft
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
              type="submit">
              Publish
            </button>
          </div>
          <label className="grid mt-5">
            Promotion Title
            <input
              type="text"
              placeholder="Enter Promotion Title"
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

          <div className="grid grid-cols-2 gap-4 mt-5">
            <label className="grid pr-6">
              Catagory
              <select
                id="label"
                name="label"
                class="outline-none rounded"
                style={{
                  height: "50px",
                  width: "590px",
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
            <label className="grid pr-6">
              Package
              <input
                type="text"
                value={pack}
                class="outline-none rounded"
                placeholder="$000.00"
                style={{
                  height: "50px",
                  width: "586px",
                  paddingLeft: "10px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                onChange={(event) => setPack(event.target.value)}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <label className="grid pr-6">
              No Of Promotion
              <select
                id="label"
                name="label"
                class="outline-none rounded"
                style={{
                  height: "50px",
                  width: "590px",
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
            <label className="grid pr-6">
              Photos
              <input
                style={{
                  height: "50px",
                  width: "590px",
                  paddingLeft: "0px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                class="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                placeholder=""
              />
            </label>
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
          </div>

          <label className="grid mt-5">
            Details
            <textarea
              id="content"
              placeholder="Enter Details"
              className="rounded outline-none pt-2"
              style={{
                height: "170px",
                width: "1210px",
                border: "2px solid #e6f7fe",
                paddingLeft: "10px",
                paddingTop: "20px",
                fontSize: "15px",
                marginTop: "5px",
              }}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>
          {/* <div> */}
          <button
            className="rounded mt-10"
            style={{
              backgroundColor: "rgba(153, 190, 17, 0.831)",
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit">
            Publish
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
