import React, { useState } from "react";
import axios from "axios";
import loImg from "./img/log.jpg";
import "../Register/regi.css";
import NavBarlog from "../NavBar/NavBarlog";

function LoginAdmin() {
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      if (response.token) {
        // If token exists in the response
        localStorage.setItem("token", response.token); // Store token in localStorage
        alert("Login Success..!");
        window.location.href = "/admin";
      } else {
        alert("Please enter valid Gmail & Password..!");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        Email: user.Email,
        Password: user.Password,
      });
      return res.data;
    } catch (err) {
      throw new Error("Failed to login");
    }
  };

  return (
    <div>    <NavBarlog />
     <div>
      <h1 className="topic_auth my-2">
        <span className="sub_auth">Admin Login</span>
      </h1>
      <div className="auth_main_box">
        <div className="auth_box_log">
          <div className="auth_sub_box_one">
            <img src={loImg} alt="regomg" className="auth_photo_log" />
          </div>
          <div className="auth_sub_box_two">
            <form onSubmit={handleSubmit}>
              <h1 className="form_wel" >Welcome Back</h1>
              <br></br>
              <label className="auth_lable">Email</label>
              <br></br>
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
              <br></br>
              <br></br>
              <label className="auth_lable">Password</label>
              <br></br>
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
              <br></br>
              <br></br>
              <button className="admin_form_cneter_btn">Login</button>
              <p className="noacc">
                If You Don't have account{" "}
                <span
                  className="noaccsub"
                  onClick={() => (window.location.href = "/regi")}
                >
                  Register
                </span>
              </p>
              <p className="noacc">
                Forgot Password{" "}
                <span
                  className="noaccsub"
                  onClick={() => (window.location.href = "/forgot-password")}
                >
                  Reset Password
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

export default LoginAdmin;
