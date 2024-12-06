import React, { useState } from "react";
import axios from "axios";
import "./regi.css";
import rgiImg from "./img/reg.jpg";
import BeforNav from "../NavBar/BeforNav";

function Register() {
  const [user, setUser] = useState({
    Firstname: "",
    Lastname: "",
    Age: "",
    Country: "",
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks for all fields
    const errors = {};
    if (!user.Firstname.trim()) {
      errors.Firstname = "Firstname is required";
    } else if (!/^[A-Z][a-z]*$/.test(user.Firstname)) {
      errors.Firstname = "Firstname should start with a capital letter";
    }
    if (!user.Lastname.trim()) {
      errors.Lastname = "Lastname is required";
    } else if (!/^[A-Z][a-z]*$/.test(user.Lastname)) {
      errors.Lastname = "Lastname should start with a capital letter";
    }
    if (!user.Age.trim()) {
      errors.Age = "Age is required";
    } else if (isNaN(user.Age)) {
      errors.Age = "Age must be a number";
    }
    if (!user.Country.trim()) {
      errors.Country = "Country is required";
    }
    if (!user.Email.trim()) {
      errors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.Email)) {
      errors.Email = "Email address is invalid";
    }
    if (!user.Password.trim()) {
      errors.Password = "Password is required";
    } else if (user.Password.length < 6) {
      errors.Password = "Password must be at least 6 characters long";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        user // Send the user object directly
      );
      if (response.data && response.data.err === "user exists") {
        alert(
          "User with this email already exists. Please use a different email."
        );
      } else {
        alert("Registration successful!");
        window.location.href = "/log";
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="">    <BeforNav />
    <div className="main_bk_clr">
      <h1 className="topic_auth my-2">
        User <span className="sub_auth">Registration</span>
      </h1>
      <div className="auth_main_box">
        <div className="auth_box">
          <div className="auth_sub_box_one">
            <img src={rgiImg} alt="regomg" className="auth_photo" />
          </div>
          <div className="auth_sub_box_two">
            <br />
            <form onSubmit={handleSubmit}>
              <br />
              <label className="auth_lable">Firstname</label>
              <br />
              <input
                className="auth_input w-100 rounded-4"
                type="text"
                value={user.Firstname}
                onChange={handleInputChange}
                name="Firstname"
                placeholder="Enter Firstname"
                style={{height:'40px'}}
                required
              ></input>
              {errors.Firstname && (
                <div className="error">{errors.Firstname}</div>
              )}
              <br />
              <br />
              <label className="auth_lable">Lastname</label>
              <br />
              <input
                className="auth_input w-100 rounded-4"
                type="text"
                value={user.Lastname}
                onChange={handleInputChange}
                name="Lastname"
                placeholder="Enter Lastname"
                style={{height:'40px'}}
                required
              ></input>
              {errors.Lastname && (
                <div className="error">{errors.Lastname}</div>
              )}
              <br />
              <br />
              <label className="auth_lable">Age</label>
              <br />
              <input
                className="auth_input w-100 rounded-4"
                type="number"
                value={user.Age}
                onChange={handleInputChange}
                name="Age"
                placeholder="Enter Age"
                style={{height:'40px'}}
                required
              ></input>
              {errors.Age && (
                <div className="error">{errors.Age}</div>
              )}
              <br />
              <br />
              <label className="auth_lable">Country</label>
              <br />
              <input
                className="auth_input w-100 rounded-4"
                type="text"
                value={user.Country}
                onChange={handleInputChange}
                name="Country"
                placeholder="Enter Country"
                style={{height:'40px'}}
                required
              ></input>
              {errors.Country && (
                <div className="error">{errors.Country}</div>
              )}
              <br />
              <br />
              <label className="auth_lable">Email</label>
              <br />
              <input
                className="auth_input w-100 rounded-4"
                type="email"
                value={user.Email}
                onChange={handleInputChange}
                name="Email"
                placeholder="Enter Email"
                style={{height:'40px'}}
                required
              ></input>
              {errors.Email && (
                <div className="error">{errors.Email}</div>
              )}
              <br />
              <br />
              <label className="auth_lable">Password</label>
              <br />
              <input
                className="auth_input w-100 rounded-4"
                type="password"
                value={user.Password}
                onChange={handleInputChange}
                name="Password"
                placeholder="Enter Password"
                style={{height:'40px'}}
                required
              ></input>
              {errors.Password && (
                <div className="error">{errors.Password}</div>
              )}
              <br />
              <br />
              <button className="admin_form_cneter_btn">Register</button>
              <p className="noacc">
                If You have account{" "}
                <span
                  className="noaccsub"
                  onClick={() => (window.location.href = "/log")}
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
