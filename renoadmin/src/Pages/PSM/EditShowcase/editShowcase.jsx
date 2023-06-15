import { useState, useRef } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { useDispatch } from "react-redux";
import { updateShowcase } from "../../User_Management/features/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditShowcase = ({ setExpand, setActiveTab }) => {
  const fileInputRef = useRef(null);
  // setExpand("showcaseManagement");
  setActiveTab("projectList");
  const head = "Edit Showcase";
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;

  const [title, setTitle] = useState(data.name);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [label, setLabel] = useState(data.category);
  const [rate, setRate] = useState(data.rate);
  const navigate = useNavigate();

  const HandleSubmit = (event) => {
    // event.preventDefault();
    const formData = new FormData();
    formData.append("proj_name", title);
    formData.append("proj_category", label);
    formData.append("details", content);
    formData.append("rate", rate);
    images.map((image, index) => {
      formData.append("pic", image);
    });

    dispatch(updateShowcase({ formData, title }))
      .then(() => {
        navigate("/home/projectList");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // fileInputRef.current.value = newImages.length;
  };

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };
  const productCategory = [
    "Elecrical",
    "Plumbing",
    "Air con service",
    "Handyman Services",
    "Carpentry Services",
    "Tiling Works",
    "Ceiling and Partition work",
    "Painting Works",
    "Aluminium and metal work",
    "Vinyl Flooring",
    "Glass Works",
    "Dismantling and Disposal",
  ];

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className=" ml-80 mb-10 relative" style={{ marginTop: "120px" }}>
        <form onSubmit={HandleSubmit}>
          <label className="grid mt-5">
            Project Title
            <input
              type="text"
              placeholder="Enter Title"
              id="title"
              className="rounded w-[100vh] outline-none"
              style={{
                height: "50px",
                // width: "1210px",
                paddingLeft: "10px",
                backgroundColor: "#e5ecff",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <div className="grid grid-cols-2 mt-5">
            <label className="grid pr-6">
              Category
              <select
                id="label"
                name="label"
                class="outline-none w-[50vh] rounded"
                style={{
                  height: "50px",
                  // width: "590px",
                  paddingLeft: "5px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                  backgroundColor: "#e5ecff",
                }}
                value={label}
                onChange={handleLabelChange}>
                <option value="">Select Catagory</option>
                {productCategory.map((item) => {
                  return <option value={`${item}`}>{item}</option>;
                })}
              </select>
            </label>
            <label className="grid">
              Project Rate
              <div className="flex flex-row">
                <select>
                  <option value="$">$</option>
                  <option value="€">€</option>
                  <option value="£">£</option>
                </select>
                <input
                  type="number"
                  value={rate}
                  className="outline-none w-[49vh] rounded"
                  placeholder="$000.00"
                  style={{
                    height: "50px",
                    // width: "586px",
                    paddingLeft: "10px",
                    backgroundColor: "#e5ecff",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                  onChange={(event) => setRate(event.target.value)}
                  required
                />
              </div>
            </label>
          </div>
          <label className="grid pr-6" style={{ marginTop: "20px" }}>
            Photos
            <div className="w-[100vh]" style={{ marginTop: "10px" }}>
              {images && images.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <button
                        className="absolute top-0 text-white"
                        style={{ right: 46 }}
                        onClick={() => handleRemoveImage(index)}>
                        <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  style={{
                    height: "48px",
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
                  required
                />
              )}
            </div>
          </label>
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
              className="rounded w-[100vh] outline-none pt-2"
              style={{
                height: "170px",
                // width: "1210px",
                backgroundColor: "#e5ecff",
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
          <button
            className="rounded mt-10 bg-lime-600 hover:bg-lime-700"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit">
            Save
          </button>
          <button
            className="rounded mt-10 bg-black hover:bg-gray-800"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
              marginLeft: "30px",
            }}>
            <Link to="/home/projectList">Cancel</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditShowcase;
