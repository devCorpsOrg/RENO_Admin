import { useDebugValue, useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { addNewPromotion } from "../../User_Management/features/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AddPromotion = ({ setExpand, setActiveTab }) => {
  // setExpand("homeService");
  setActiveTab("promotionManagement");
  const head = "Add New Promotion";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pack, setPack] = useState("");
  const [offer, setOffer] = useState("");
  const [date, setDate] = useState("");
  const [offerby, setOfferby] = useState("");
  const [id, setId] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [promotion, setPromotion] = useState("");

  const handleSubmit = async (event) => {
    // event.preventDefault();

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
    console.log("Back");
    navigate("/home/promotionManagement");
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


          <div className="grid grid-cols-2 w-[98vh] gap-5 mt-5">
          <label className="grid mt-5">
            Promotion Id
            <input
              type="text"
              placeholder="Enter Promotion Id"
              id="title"
              className="rounded w-[50vh] outline-none"
              style={{
                height: "50px",
                paddingLeft: "10px",
                border: "2px solid 	#e6f7fe",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={id}
              onChange={(event) => setId(event.target.value)}
              required
            />
          </label>
          <label className="grid mt-5">
            Promotion Title
            <input
              type="text"
              placeholder="Enter Promotion Title"
              id="title"
              className="rounded w-[50vh] outline-none"
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
                onChange={handleCategoryChange}
              >
                <option value="">Select Catagory</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
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
              Offer
              <div className="flex gap-1">
                <select
                  id="label"
                  name="label"
                  className="outline-none w-[12vh] rounded"
                  style={{
                    height: "50px",
                    // width: "590px",
                    paddingLeft: "5px",
                    border: "2px solid 	#e6f7fe",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                  value={offerby}
                  onChange={(event) => setOfferby(event.target.value)}
                >
                  {/* <option value="">Offer by</option> */}
                  <option value="Price">Price</option>
                  <option value="Percent">Percent</option>
                </select>
                {/* <label className="grid">
              Package */}
                <input
                  type="text"
                  value={offer}
                  className="outline-none w-[37.5vh] rounded"
                  placeholder="000.00"
                  style={{
                    height: "50px",
                    // width: "586px",
                    paddingLeft: "10px",
                    border: "2px solid 	#e6f7fe",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                  onChange={(event) => setOffer(event.target.value)}
                  required
                />
                {/* </label> */}
              </div>
            </label>
            {/* <label className="grid">
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
                onChange={handlePromotionChange}
              >
                <option value="">No of Promotion</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label> */}
            {/* <label className="grid">
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
            </label> */}
            <label className="grid">
              Date of Expiration
              <input
                type="date"
                value={date}
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
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>
          </div>

          {/* <div
            style={{ marginLeft: "385px", width: "600px", marginTop: "10px" }}
          >
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
          </div> */}

          {/* <label className="grid mt-5">
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
          </label> */}
          {/* <div> */}
          {/* </div> */}
          <button
            className="rounded mt-10 bg-lime-600 hover:bg-lime-700"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit"
          >
            Publish
          </button>
          {/* <button
            className="rounded mt-10 bg-black hover:bg-gray-800"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
              marginLeft: "30px",
            }}
            >
            Draft
          </button> */}
          <button
            className="rounded mt-10 bg-amber-600 hover:bg-amber-700"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
              marginLeft: "30px",
            }}
            type="submit"
          >
            <Link to="/home/promotionManagement">Back</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPromotion;
