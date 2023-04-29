import { useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../User_Management/features/userSlice";

const EditCategory = ({ setExpand, setActiveTab }) => {
  setExpand("marketPlace");
  setActiveTab("catagoryManagement");
  const head = "Edit Category";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, content); // Do something with the data
    setTitle("");
    // setImages([]);

    const formData = new FormData();
    formData.append('prod_category', title);
    images.map((image, index) => {
      formData.append('media', image);
    })

    dispatch(updateCategory({formData, title}))
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
              placeholder="Enter Title"
              id="title"
              className="rounded outline-none"
              style={{
                height: "50px",
                width: "1210px",
                paddingLeft: "10px",
                backgroundColor: "#e5ecff",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label className="grid pr-6" style={{ marginTop: "20px" }}>
            Photos
            <div style={{ width: "600px", marginTop: "10px" }}>
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
                        onClick={() => handleRemoveImage(index)}
                      >
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
                />
              )}
            </div>
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

export default EditCategory;
