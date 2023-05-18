import { useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../User_Management/features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = ({ setExpand, setActiveTab }) => {
  // setExpand("homeService");
  setActiveTab("productList");
  const head = "Add Product";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pack, setPack] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [prodCat, setProdCat] = useState("");
  const [inventory, setInventory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title,
      content,
      pack,
      prodCat,
      inventory,
      images,
      category,
    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);

    const formData = new FormData();
    formData.append("prod_name", title);
    formData.append("proj_category", prodCat);
    formData.append("inv_count", inventory);
    formData.append("rate", pack);
    formData.append("prod_category", category);
    formData.append("details", content);
    images.forEach((image, index) => {
      formData.append(`pic_url`, image);
    });

    dispatch(addNewProduct(formData));
    navigate('/home/productList');
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

  const handleProdCatChange = (event) => {
    setProdCat(event.target.value);
  };

  const handleInventoryChange = (event) => {
    setInventory(event.target.value);
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className=" ml-80 mb-10 relative" style={{ marginTop: "120px" }}>
        <form onSubmit={handleSubmit}>
          <label className="grid mt-5">
            Product Title
            <input
              type="text"
              placeholder="Enter Title"
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

          <div className="grid grid-cols-2 gap-2 mt-5">
            <label className="grid">
              Catagory
              <select
                id="label"
                name="label"
                className="outline-none w-[49vh] rounded"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Catagory</option>
                <option value="admin">Admin</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="grid">
              Package
              <input
                type="text"
                value={pack}
                className="outline-none w-[49vh] rounded"
                placeholder="$000.00"
                style={{
                  height: "50px",
                  paddingLeft: "10px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                onChange={(event) => setPack(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            <label className="grid">
              Product Catagory
              <select
                id="label"
                name="label"
                className="outline-none w-[49vh] rounded"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={prodCat}
                onChange={handleProdCatChange}
                required
              >
                <option value="">Select Product Catagory</option>
                <option value="admin">Admin</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="grid">
              Number Of Inventory
              <select
                id="label"
                name="label"
                className="outline-none w-[49vh] rounded"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={inventory}
                onChange={handleInventoryChange}
                required
              >
                <option value="">Select Number Of Inventory</option>
                <option value="admin">1</option>
                <option value="work">2</option>
                <option value="other">3</option>
              </select>
            </label>
          </div>

          <div>
            <label className="grid mt-5" style={{ fontSize: "15px" }}>
              Photos
              <input
                class="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                style={{ border: "2px solid #e6f7fe", width: "450px" }}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                placeholder=""
              />
            </label>
          </div>
          <div style={{ width: "600px", marginTop: "10px" }}>
            {images && images.length > 0 && (
              <div className="grid grid-cols-6 gap-2">
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

          <label className="grid mt-5">
            Project Details
            <textarea
              id="content"
              placeholder="Enter Details"
              className="rounded outline-none w-[100vh] pt-2"
              style={{
                height: "170px",
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
          {/* </div> */}
        </form>
          <button
            className="rounded mt-10 bg-lime-600 hover:bg-lime-700"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            onClick={handleSubmit}
            type="submit">
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
            
          >
            <Link to='/home/productList'>Back</Link>
          </button>
      </div>
    </div>
  );
};

export default AddProduct;
