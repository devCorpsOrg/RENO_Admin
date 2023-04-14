import { useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";

const EditMember = ({ setExpand, setActiveTab }) => {
  setExpand("marketPlace");
  setActiveTab("allMembers");
  const head = "Edit Member";

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [label, setLabel] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, content); // Do something with the data
    setTitle("");
    setContent("");
    // setImages([]);
  };

  const handlePhotoUpload = (event) => {
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

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // fileInputRef.current.value = newImages.length;
  };

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div
        className=" ml-72 mb-10 relative"
        style={{ marginTop: "70px", marginLeft: "300px" }}>
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
              type="submit">
              Save
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-5">
            <label className="grid pr-6">
              User Name
              <input
                id="label"
                placeholder="User Name"
                class="outline-none rounded"
                style={{
                  height: "50px",
                  //   width: "590px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
            <label className="grid pr-6">
              Email Address
              <input
                type="text"
                class="outline-none rounded"
                placeholder="Email Address"
                style={{
                  height: "50px",
                  //   width: "586px",
                  paddingLeft: "10px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="grid pr-6">
              Contact No.
              <input
                type="text"
                class="outline-none rounded"
                placeholder="Contact No."
                style={{
                  height: "50px",
                  //   width: "586px",
                  paddingLeft: "10px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={contact}
                onChange={(event) => setContact(event.target.value)}
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">
            <label className="grid pr-6">
              User ID
              <input
                id="label"
                placeholder="User ID"
                class="outline-none rounded"
                style={{
                  height: "50px",
                  //   width: "590px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
              />
            </label>
            <label className="grid pr-6">
              User Type
              <select
                id="label"
                name="label"
                class="outline-none rounded"
                style={{
                  height: "50px",
                  //   width: "590px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={label}
                onChange={handleLabelChange}>
                <option value="">Select User Type</option>
                <option value="personal">Admin</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="grid pr-6">
              Photos
              <div style={{ width: "350px", marginTop: "-2px" }}>
                {images && images.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url}
                          alt={image.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                        <button
                          className="absolute top-0 text-red-500"
                          style={{ right: -59, top: 12 }}
                          onClick={() => handleRemoveImage(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    style={{
                      height: "48px",
                      width: "370px",
                      paddingLeft: "0px",
                      border: "2px solid 	#e6f7fe",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                    class="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    placeholder=""
                  />
                )}
              </div>
            </label>
          </div>

          <label className="grid mt-5">
            Internal Note
            <textarea
              id="content"
              placeholder="Enter Details"
              className="rounded outline-none pt-2"
              style={{
                height: "170px",
                width: "1190px",
                backgroundColor: "#e5ecff",
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
            type="submit">
            Cancel
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default EditMember;
