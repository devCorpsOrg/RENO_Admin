import React, { useState } from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userSlice";

const CreateUser = ({setActiveTab, setExpand}) => {
  setExpand("userManagement");
  setActiveTab("allUsers")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [label, setLabel] = useState("");
  const dispatch = useDispatch();

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

  const head = "Create User";

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("uid", userId);
    formData.append("role", label);
    formData.append("pic", photo, photo.name);
    
    dispatch(createUser(formData));
    
    // axios({
    //   method: "post",
    //   url: "/usercreate/",
    //   data:  formData  ,
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    // })
    //   .then(function (response) {
    //     //handle success
    //     console.log(name)
    //     console.log(response);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     console.log(response);
    //   });
  };

  return (
    <div>
      <div>
        <TopHeader className="fixed" head={head} />
      </div>

      <div className="ml-72 mt-20 relative" style={{ marginTop: "140px" }}>
        <form onSubmit={handleSubmit}>
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
                  border: "2px solid 	#e6f7fe",
                  paddingLeft: "5px",
                }}
                onChange={handleNameChange}
                required
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
                  border: "2px solid 	#e6f7fe",
                  paddingLeft: "5px",
                }}
                onChange={handleEmailChange}
                required
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
                  border: "2px solid 	#e6f7fe",
                  paddingLeft: "5px",
                }}
                onChange={handlePhoneChange}
                required
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
                  border: "2px solid 	#e6f7fe",
                  paddingLeft: "5px",
                }}
                onChange={handleUserIdChange}
                required
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
                  border: "2px solid 	#e6f7fe",
                  paddingLeft: "5px",
                }}
                value={label}
                onChange={handleLabelChange}
                required
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
                  required
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
              // onClick={handleSubmit}
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

export default CreateUser;
