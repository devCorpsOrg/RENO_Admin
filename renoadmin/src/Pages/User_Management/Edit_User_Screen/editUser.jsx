import React, { useState } from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { Form, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/userSlice";

const EditUser = ({setActiveTab, setExpand}) => {
  setExpand("userManagement");
  setActiveTab("allUsers");

  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [label, setLabel] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
  };

  const head = "Edit User";

  const handleSubmit = async (event) => {
    event.preventDefault();
  
  
    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", label);
    formData.append("uid", userId);
    // if (photo) {
      formData.append("pic", photo);
    // }

    dispatch(updateUser({formData, userId}))
    

  };
  
  

  return (
    <div>
      <div>
        <TopHeader className="fixed" head={head} />
      </div>

      <div className="ml-72 mt-20 relative" style={{ marginTop: "140px" }}>
        <form>
          <div class="grid grid-cols-3 gap-4">
            <label className="grid pr-6">
              User Name
              <input
                type="text"
                value={name}
                class="outline-none rounded"
                style={{
                  height: "50px",
                  width: "380px",
                  backgroundColor: "#e5ecff",
                  paddingLeft: "5px",
                }}
                onChange={handleNameChange}
              />
            </label>
            <label className="grid pr-6">
              Email Address
              <input
                type="email"
                value={email}
                class="outline-none rounded"
                style={{
                  height: "50px",
                  width: "380px",
                  backgroundColor: "#e5ecff",
                  paddingLeft: "5px",
                }}
                onChange={handleEmailChange}
              />
            </label>
            <label className="grid pr-6">
              Contact No
              <input
                type="tel"
                value={phone}
                class="outline-none rounded"
                style={{
                  height: "50px",
                  width: "380px",
                  backgroundColor: "#e5ecff",
                  paddingLeft: "5px",
                }}
                onChange={handlePhoneChange}
              />
            </label>
            <label className="grid pr-6">
              User ID
              <input
                type="userId"
                value={userId}
                class="outline-none rounded"
                style={{
                  height: "50px",
                  width: "380px",
                  backgroundColor: "#e5ecff",
                  paddingLeft: "5px",
                }}
                onChange={handleUserIdChange}
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
                  width: "380px",
                  backgroundColor: "#e5ecff",
                  paddingLeft: "5px",
                }}
                value={label}
                onChange={handleLabelChange}
              >
                <option value="">Select a label</option>
                <option value="personal">Admin</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="grid pr-6">
              Photo
              {photo ? (
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <button
                      style={{
                        color: "red",
                        paddingLeft: "5px",
                        cursor: "pointer",
                        backgroundColor:"white",
                        marginLeft: "20px"
                      }}
                      onClick={handlePhotoRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              )}
            </label>
          </div>
          <div className="flex mt-7 items-center">
            <button
              className="rounded"
              style={{
                backgroundColor: "rgba(153, 190, 17, 0.831)",
                width: "130px",
                height: "55px",
                color: "white",
              }}
              type="submit"
              onClick={handleSubmit}
            >
              SAVE
            </button>
            <Link to="/home/allUsers" style={{ paddingLeft: "50px" }}>
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
