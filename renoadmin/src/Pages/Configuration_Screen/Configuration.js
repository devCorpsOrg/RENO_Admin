import React, { useState, useEffect } from "react";
import TopHeader from "../../UI/TopHeader/TopHeader";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import Cookies from "js-cookie";

const Configuration = ({ setActiveTab }) => {
  const [sitename, setName] = useState("");
  const [mail, setEmail] = useState("");
  const [email, setSiteEmail] = useState("");
  const [url, setUrl] = useState("");
  const [smtp_details, setDetails] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for controlling the alert

  useEffect(() => {
    // Fetch data from the
    axios
      .get(
        `http://139.59.236.50:8000/settings/?usname=${Cookies.get("username")}`
      )

      .then((res) => {
        setName(res.data[0].fields.sitename);
        setEmail(res.data[0].fields.admin_mail);
        setSiteEmail(res.data[0].fields.support_email);
        setUrl(res.data[0].fields.url);
        setDetails(res.data[0].fields.smtp_details);
        console.log(res.data[0].fields.support_email);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(Cookies.get("username"));
  }, []);

  setActiveTab("settings");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      sitename: sitename,
      url: url,
      mail: mail,
      email: email,
      smtp_details: smtp_details,
    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    try {
      const response = await axios
        .post("http://139.59.236.50:8000/setting/", {
          sitename,
          url,
          mail,
          email,
          smtp_details,
          usname: Cookies.get("username"),
        })
        .then((response) => {
          setShowAlert(true);
          console.log(response);
          alert("Created Successfully");
        })
        .catch((err) => {
          alert("Settings already exists");
          console.log(err);
        });
    } catch (err) {
      console.log("Error saving data", err);
    }
  };

  const head = "Configuration";
  const roles = Cookies.get('roles')

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Settings created successfully
        </Alert>
      </Snackbar>
      <div className=" ml-72 mt-32 w-[100%] relative">
        <div className="flex flex-row w-full h-full justify-center sm:justify-start items-center m-3">
          <form
            action="submit"
            className="w-full sm:w-2/3 px-5"
            onSubmit={handleSubmit}
          >
            <h2 className="font-semibold text-2xl mb-10">
              Configuration and Settings
            </h2>
            <div className="flex flex-col sm:flex-row mb-4 w-full gap-5">
              <div className="mb-2 w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Site Name</span>
                <input
                  type="text"
                  value={sitename}
                  onChange={(event) => setName(event.target.value)}
                  required
                  name="siteName"
                  placeholder="Enter Site Name"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Portal URL</span>
                <input
                  type="text"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  required
                  name="portalUrl"
                  placeholder="Enter Portal URL"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mb-4 gap-5">
              <div className="mb-2 w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Admin Email</span>
                <input
                  type="email"
                  value={mail}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  name="adminEmail"
                  placeholder="Enter Admin Email"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Support Mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setSiteEmail(event.target.value)}
                  required
                  name="supportMail"
                  placeholder="Enter Support Mail"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>
            </div>
            <div className="mb-4">
              <span>SMTP Details</span>
              <textarea
                name="smtpDetails"
                required
                value={smtp_details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder="Enter Details"
                className="h-32 p-3 w-full border rounded-md border-blue-100 focus:border-blue-200"
              ></textarea>
            </div>
            {roles === "admin" || roles === "editor" ? (
              <button
                // type="submit"
                onSubmit={handleSubmit}
                className="bg-lime-500 hover:bg-lime-700 text-white font-bold w-[20vh] h-[7vh] py-2 px-4 rounded-md"
              >
                Submit
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
