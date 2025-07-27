import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
// const axios = require("axios");
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { Button } from "flowbite-react";
// // only import what you want to use
// import {
//   Button,
//   Checkbox,
//   FileInput,
//   Label,
//   Radio,
//   RangeSlider,
//   Select,
//   Textarea,
//   TextInput,
//   ToggleSwitch,
// } from "flowbite-react";

import ShowData from "./ShowData";
// import { axios } from './../../node_modules/axios/dist/esm/axios';

function Enquiry() {



  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    message: "",
    _id: "",
  });
  const [datalist, setDatalist] = useState([]);
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let getData = () => {
    axios
      .get("https://demo-mern-project.onrender.com/api/user/routes/view")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData) {
            setDatalist(finalData.datalist);
        }
      });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // console.log(formData);/

    if (formData._id) {
      //update

      axios
        .put(
          `https://demo-mern-project.onrender.com/api/user/routes/editrow/${formData._id}`,
          formData
        )
        .then((res) => {
          // console.log(res.data);
          // alert("Form Saved");
          toast.success("Data Updated Successfully..");
          setFormData({
            username: "",
            email: "",
            phoneNumber: "",
            message: "",
          });
          getData();
        });
    } else {
      axios
        .post("https://demo-mern-project.onrender.com/api/user/routes/insert", formData)
        .then((res) => {
          console.log(res.data);
          // alert("Form Saved");
          toast.success("Data Saved Successfully..");
          setFormData({
            username: "",
            email: "",
            phoneNumber: "",
            message: "",
          });
          getData();
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error while saving form!");
          // alert("Error while saving form");
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();



  return (
    <>
      {/* <Button>Click me</Button>; */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <ToastContainer />
        <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-[30%_70%] w-full max-w-7xl overflow-hidden border">
          {/* Left Form Panel (30% on md+ screens, 100% on small) */}
          <div className="bg-blue-600 text-white p-6 sm:p-8 flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
              Contact Us
            </h1>
            <p className="text-sm text-center mb-6">
              We'd love to hear from you. Please fill out the form.
            </p>

            <form action="" className="space-y-6" onSubmit={handleSubmitForm}>
              {/* Name */}
              <div className="relative">
                <input
                  required
                  type="text"
                  id="name"
                  name="username"
                  value={formData.username}
                  onChange={handlechange}
                  placeholder=" "
                  className="peer w-full px-3 pt-5 pb-2 border border-white bg-blue-500 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white"
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 top-2 text-sm text-white transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
                >
                  Full Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  onChange={handlechange}
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder=" "
                  className="peer w-full px-3 pt-5 pb-2 border border-white bg-blue-500 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white"
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 top-2 text-sm text-white transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  onChange={handlechange}
                  required
                  type="tel"
                  id="phone"
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  placeholder=" "
                  className="peer w-full px-3 pt-5 pb-2 border border-white bg-blue-500 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-3 top-2 text-sm text-white transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
                >
                  Phone Number
                </label>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  onChange={handlechange}
                  required
                  id="message"
                  name="message"
                  value={formData.message}
                  rows="4"
                  placeholder=" "
                  className="peer w-full h-32 resize-none px-3 pt-5 pb-2 border border-white bg-blue-500 rounded-md text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white"
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-3 top-2 text-sm text-white transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
                >
                  Your Message
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 transition"
              >
                {formData._id ? "Update" : "Save"}
              </button>
            </form>
          </div>

          {/* Right Table Panel (70%) */}

          <ShowData
            data={datalist}
            getData={getData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
}

export default Enquiry;
