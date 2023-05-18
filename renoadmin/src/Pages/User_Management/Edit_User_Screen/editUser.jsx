import React, { useState, useEffect } from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/userSlice";
import { useLocation } from "react-router-dom";

const EditUser = ({ setActiveTab }) => {
  // setExpand("userManagement")
  setActiveTab("editDetails");

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const UrlId = searchParams.get("uid");
  console.log("This is userId", UrlId);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://139.59.236.50:8000/searchusers/?uid=${UrlId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [UrlId]);
  console.log(user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [label, setLabel] = useState("");

  const handleNameChange = (event) => {
    setName(user.username);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(user.uid);
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

  const HandleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", label);
    formData.append("uid", user);
    // if (photo) {
    formData.append("pic", photo);
    // }
    console.log(formData);
    const navigate = useNavigate();
    dispatch(updateUser({ formData, userId }))
      .then(() => {
        navigate("/home/allUsers");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <TopHeader className="fixed" head={head} />
      </div>

      {user ? (
        <div className="ml-80 mt-20 relative" style={{ marginTop: "140px" }}>
          <form onSubmit={HandleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <label className="grid pr-6">
                User Name
                <input
                  type="text"
                  value={user.username}
                  className="outline-none rounded"
                  style={{
                    height: "50px",
                    width: "380px",
                    backgroundColor: "#e5ecff",
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
                  value={user.email}
                  className="outline-none rounded"
                  style={{
                    height: "50px",
                    width: "380px",
                    backgroundColor: "#e5ecff",
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
                  className="outline-none rounded"
                  style={{
                    height: "50px",
                    width: "380px",
                    backgroundColor: "#e5ecff",
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
                  value={user.uid}
                  className="outline-none rounded"
                  style={{
                    height: "50px",
                    width: "380px",
                    backgroundColor: "#e5ecff",
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
                  className="outline-none rounded"
                  style={{
                    height: "50px",
                    width: "380px",
                    backgroundColor: "#e5ecff",
                    paddingLeft: "5px",
                  }}
                  value={label}
                  onChange={handleLabelChange}
                  required>
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
                          backgroundColor: "white",
                          marginLeft: "20px",
                        }}
                        onClick={handlePhotoRemove}>
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
                    className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[50vh]"
                    style={{ border: "2px solid #e6f7fe" }}
                  />
                )}
              </label>
            </div>
          </form>
          <div className="flex mt-10 gap-5 items-center">
            <button
              className="rounded bg-lime-600 hover:bg-lime-700"
              style={{
                width: "130px",
                height: "55px",
                color: "white",
              }}
              type="submit"
              onClick={HandleSubmit}>
              SAVE
            </button>
            <button
              className="rounded bg-black hover:bg-gray-800"
              style={{
                width: "130px",
                height: "55px",
                color: "white",
              }}>
              <Link to="/home/allUsers">Back</Link>
            </button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default EditUser;
