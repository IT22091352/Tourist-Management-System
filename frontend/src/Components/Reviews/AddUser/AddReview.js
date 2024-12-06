import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router";
import axios from "axios";
import { ReactCountryFlag } from "react-country-flag";
import countryList from "country-list";
import "./AddUser.css";
import StarRating from "../StarRating/StarRating";

function AddReview() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    country: "",
    accommodations: "",
    destinations: "",
    activities: "",
    date: "",
    accommodationsRating: 0,
    destinationsRating: 0,
    activitiesRating: 0,
  });

  // Set the current date as the default value
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setInputs((prevState) => ({
      ...prevState,
      date: currentDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validation for name field
    if (name === "name") {
      newValue = value.replace(/[^A-Za-z ]/gi, ""); 
    }

    // Validation for country field
    if (name === "country") {
      newValue = value.replace(/[^A-Za-z ]/gi, ""); 
    }

    // Update state with the new input value
    setInputs((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    if (!inputs.accommodationsRating) {
      console.error("Accommodations rating is required");
      return;
    }
    await sendRequest();
    navigate("/seereviews");
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/users", {
        ...inputs,
        date: new Date().toISOString(),
      })
      .then((res) => res.data);
  };

  return (
    <div
      className="add-user-page"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/vacation-holidays-background-with-realistic-globe-suitcase-photo-camera_1284-10476.jpg?t=st=1713647995~exp=1713651595~hmac=4881b5601751f85dc5d5f7edd7b00aaa11be78d67c0506444f12aa9e27448de3&w=740")',
      }}
    >
      <Nav />
      <div className="container" style={{ fontFamily: "Poppins, sans-serif" }}>
        <div className="form-container">
          <div className="Header">
            <h1>Share Your Journey</h1>
          </div>
          <div
            className="Header2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <p>
              Embark on the journey of sharing your experiences with fellow
              travelers !
            </p>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                required
              />
            </div>

            <div className="form-group">
              <label>Country of Origin:</label>
              <div className="country-input">
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  value={inputs.country}
                  required
                />
                {inputs.country && (
                  <ReactCountryFlag
                    countryCode={countryList.getCode(inputs.country)}
                    svg
                  />
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Accommodations: How heavenly was your retreat ?</label>
              <input
                type="text"
                name="accommodations"
                onChange={handleChange}
                value={inputs.accommodations}
                required
              />
              <StarRating
                value={inputs.accommodationsRating}
                onChange={(rating) =>
                  setInputs((prevState) => ({
                    ...prevState,
                    accommodationsRating: rating,
                  }))
                }
              />
            </div>

            <div className="form-group">
              <label>Destinations: How is your destination ?</label>
              <input
                type="text"
                name="destinations"
                onChange={handleChange}
                value={inputs.destinations}
                required
              />
              <StarRating
                value={inputs.destinationsRating}
                onChange={(rating) =>
                  setInputs((prevState) => ({
                    ...prevState,
                    destinationsRating: rating,
                  }))
                }
              />
            </div>

            <div className="form-group">
              <label>Activities: What adventures did you embark on ?</label>
              <input
                type="text"
                name="activities"
                onChange={handleChange}
                value={inputs.activities}
                required
              />
              <StarRating
                value={inputs.activitiesRating}
                onChange={(rating) =>
                  setInputs((prevState) => ({
                    ...prevState,
                    activitiesRating: rating,
                  }))
                }
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
