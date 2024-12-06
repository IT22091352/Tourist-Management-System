import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Register/regi.css";

function UpdateUser() {
  const [input, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/api/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/api/users/${id}`, {
      Firstname: String(input.Firstname),
      Lastname: String(input.Lastname),
      age: Number(input.age),
      country: String(input.country),
      Email: String(input.Email),
    });
  };

  const validateForm = () => {
    let valid = true;
    let errorsObj = {};

    if (!/^[A-Za-z]+$/.test(input.Firstname)) {
      errorsObj.Firstname = "Firstname must contain only letters";
      valid = false;
    }
    if (!/^[A-Za-z]+$/.test(input.Lastname)) {
      errorsObj.Lastname = "Lastname must contain only letters";
      valid = false;
    }
    if (!/^[A-Za-z]+$/.test(input.country)) {
      errorsObj.country = "Country must contain only letters";
      valid = false;
    }
    if (!input.age || isNaN(input.age) || input.age <= 0) {
      errorsObj.age = "Age must be a positive number";
      valid = false;
    }
    if (!input.Email) {
      errorsObj.Email = "Email is required";
      valid = false;
    }

    setErrors(errorsObj);
    return valid;
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await sendRequest();
        window.alert("Update successful!");
        navigate("/userdetails");
      } catch (error) {
        console.error("Error updating profile:", error.message);
        // Handle error if needed
      }
    }
  };

  return (
    <div>
      <br />
      <h1 className="topic_auth my-2">
        Update <span className="sub_auth">User Details</span>
      </h1>
      <br />
      <div className="">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form className="form_user_details" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Firstname:</label>
                <input
                  className="form-control w-100 rounded-4"
                  style={{ height: "40px" }}
                  type="text"
                  name="Firstname"
                  onChange={handleChange}
                  value={input.Firstname || ""}
                  required
                />
                {errors.Firstname && (
                  <p className="text-danger">{errors.Firstname}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Lastname:</label>
                <input
                  className="form-control w-100 rounded-4"
                  type="text"
                  name="Lastname"
                  style={{ height: "40px" }}
                  onChange={handleChange}
                  value={input.Lastname || ""}
                  required
                />
                {errors.Lastname && (
                  <p className="text-danger">{errors.Lastname}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Age:</label>
                <input
                  className="form-control w-100 rounded-4"
                  type="text"
                  name="age"
                  style={{ height: "40px" }}
                  onChange={handleChange}
                  value={input.age || ""}
                  required
                />
                {errors.age && <p className="text-danger">{errors.age}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Country:</label>
                <input
                  className="form-control w-100 rounded-4"
                  type="text"
                  name="country"
                  style={{ height: "40px" }}
                  onChange={handleChange}
                  value={input.country || ""}
                  required
                />
                {errors.country && (
                  <p className="text-danger">{errors.country}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  className="form-control w-100 rounded-4"
                  type="email"
                  style={{ height: "40px" }}
                  name="Email"
                  onChange={handleChange}
                  value={input.Email || ""}
                  required
                />
                {errors.Email && (
                  <p className="text-danger">{errors.Email}</p>
                )}
              </div>
              <button className="admin_form_cneter_btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
