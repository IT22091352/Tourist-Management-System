import React, { useState } from "react";
import axios from "axios";
import loImg from "./img/pas1.jpg";
import "../Register/regi.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send request to password reset endpoint
      const response = await axios.post("http://localhost:5000/forgot-password", {
        Email: email,
      });

      if (response.data.success) {
        alert("Password reset link sent to your email.");
      } else {
        alert("Failed to send password reset link. Please try again.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="auth_main_box">
      <br/>
      <h1 className="topic_auth my-2">
        Password <span className="sub_auth">Reset</span>
      </h1>
      <br/>
      <div className="auth_box_log">
        <div className="auth_sub_box_one">
        <img src={loImg} alt="regomg" className="auth_photo_log" />
        </div>
        <div className="auth_sub_box_two">
          <form onSubmit={handleSubmit}>
            <h1 className="form_wel">Forgot Password</h1>
            <br />
            <label className="auth_label">Email</label>
            <br />
            <input
              className="auth_input"
              type="email"
              value={email}
              onChange={handleInputChange}
              name="Email"
              placeholder="Enter your email"
              required
            />
            <br />
            <br />
            <button className="admin_form_cneter_btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
