import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Firstname: "",
    Lastname: "",
    age: "",
    country: "",
    Email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
      await sendRequest().then(() => {
        alert("User added successfully!");
        history("/userdetails");
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateInputs = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/; // Regex to match only letters and spaces
    if (!inputs.Firstname.trim()) {
      errors.Firstname = "Firstname is required";
    } else if (!nameRegex.test(inputs.Firstname.trim())) {
      errors.Firstname = "Firstname should contain only letters";
    }
    if (!inputs.Lastname.trim()) {
      errors.Lastname = "Lastname is required";
    } else if (!nameRegex.test(inputs.Lastname.trim())) {
      errors.Lastname = "Lastname should contain only letters";
    }
    if (!inputs.country.trim()) {
      errors.country = "Country is required";
    } else if (!nameRegex.test(inputs.country.trim())) {
      errors.country = "Country should contain only letters";
    }
    if (!inputs.age.trim()) {
      errors.age = "Age is required";
    } else if (isNaN(inputs.age) || inputs.age < 1 || inputs.age > 100) {
      errors.age = "Please enter a valid age";
    }
    if (!inputs.Email.trim()) {
      errors.Email = "Email is required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.Email)
    ) {
      errors.Email = "Please enter a valid email address";
    }
    return errors;
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/api/users", {
        Firstname: String(inputs.Firstname),
        Lastname: String(inputs.Lastname),
        age: Number(inputs.age),
        country: String(inputs.country),
        Email: String(inputs.Email),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <br />
      <h1 className="topic_auth">
        Add <span className="sub_auth">User Details</span>
      </h1>
      <br />
      <div className="form_main_box">
        <form className="form_user_details" onSubmit={handleSubmit}>
          <label className="auth_label">Firstname:</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="text"
            name="Firstname"
            onChange={handleChange}
            value={inputs.Firstname}
            style={{ height: "40px" }}
            required
          />
          {errors.Firstname && (
            <div className="error">{errors.Firstname}</div>
          )}
          <br />
          <br />
          <label className="auth_label">Lastname:</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="text"
            name="Lastname"
            onChange={handleChange}
            value={inputs.Lastname}
            style={{ height: "40px" }}
            required
          />
          {errors.Lastname && <div className="error">{errors.Lastname}</div>}
          <br />
          <br />
          <label className="auth_label">Age:</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="number"
            name="age"
            onChange={handleChange}
            value={inputs.age}
            style={{ height: "40px" }}
            required
          />
          {errors.age && <div className="error">{errors.age}</div>}
          <br />
          <br />
          <label className="auth_label">Country:</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="text"
            name="country"
            onChange={handleChange}
            value={inputs.country}
            style={{ height: "40px" }}
            required
          />
          {errors.country && <div className="error">{errors.country}</div>}
          <br />
          <br />
          <label className="auth_label">Email:</label>
          <br />
          <input
            className="auth_input w-100 rounded-4"
            type="email"
            name="Email"
            onChange={handleChange}
            value={inputs.Email}
            style={{ height: "40px" }}
            required
          />
          {errors.Email && <div className="error">{errors.Email}</div>}
          <br />
          <br />
          <button className="admin_form_center_btn" type="submit">
            Submit
          </button>{" "}
        </form>
      </div>
    </div>
  );
}

export default AddUser;
