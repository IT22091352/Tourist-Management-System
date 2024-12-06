import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Register/regi.css";

function UpdateProfile() {
  const [input, setInputs] = useState({});
  const navigate = useNavigate(); // Changed from history to navigate
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/regi/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.regi));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/regi/${id}`, {
        Firstname: String(input.Firstname),
        Lastname: String(input.Lastname),
        Age: String(input.Age),
        Country: String(input.Country),
        Email: String(input.Email),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // Validation checks
    switch (name) {
      case "Firstname":
      case "Lastname":
        // Check if the input contains only letters
        if (!/^[A-Za-z]+$/.test(value)) {
          errorMessage = `${name} should only contain letters.`;
        }
        break;

      case "Age":
        // Check if the age is a number between 0 and 120
        const age = parseInt(value);
        if (isNaN(age) || age < 0 || age > 120) {
          errorMessage = "Age should be a number between 0 and 120.";
        }
        break;

      case "Country":
        // Check if the country contains only letters
        if (!/^[A-Za-z]+$/.test(value)) {
          errorMessage = "Country should only contain letters.";
        }
        break;

      case "Email":
        // Check if the email format is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errorMessage = "Invalid email format.";
        }
        break;
        
      default:
        break;
    }

    // If there's an error message, display it using alert
    if (errorMessage) {
      alert(errorMessage);
    } else {
      // Update the input state if the validation passes
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      await sendRequest();
      // Show success message
      window.alert("Update successful!");
      // Navigate to the profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      // Handle error if needed
    }
  };

  return (
    <div>
      <h1 className="topic_auth">
        Update User <span className="sub_auth">Account</span>
      </h1>
      <br/>
      <div className="form_main_box">
        <form className="form_user_details" onSubmit={handleSubmit}>
          <label className="auth_lable">Firstname</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="text"
            value={input.Firstname}
            onChange={handleChange}
            name="Firstname"
            style={{height:'40px'}}
            required
          />
          <br />
          <br />
          <label className="auth_lable">Lastname</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="text"
            value={input.Lastname}
            onChange={handleChange}
            name="Lastname"
            style={{height:'40px'}}
            required
          />
          <br />
          <br />
          <label className="auth_lable">Age</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="number"
            value={input.Age}
            onChange={handleChange}
            name="Age"
            style={{height:'40px'}}
            required
          />
          <br />
          <br />
          <label classname="auth_input w-100 rounded-4">Country</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="text"
            value={input.Country}
            onChange={handleChange}
            name="Country"
            style={{height:'40px'}}
            required
          />
          <br />
          <br />
          <label className="auth_lable">Email</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="email"
            value={input.Email}
            onChange={handleChange}
            name="Email"
            style={{height:'40px'}}
            required
          />
          <br />
          <br />
          <button className="admin_form_cneter_btn" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
