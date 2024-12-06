import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { ReactCountryFlag } from "react-country-flag";
import countryList from "country-list";
import "./UpdateUser.css"; // Import the CSS file

function UpdateReview() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };

    fetchHandler();
  }, [id]);


  // send PUT request to update user data
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        name: inputs.name,
        country: inputs.country,
        accommodations: inputs.accommodations,
        destinations: inputs.destinations,
        activities: inputs.activities,
        date: inputs.date,
      })
      .then((res) => res.data);
  };

  //input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/seereviews"));
  };

  //get country code from country name
  const getCountryCode = (countryName) => {
    const code = countryList.getCode(countryName);
    return code ? code : "";
  };

  
  return (
    <div
      className="body"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/travel-concept-with-baggage_23-2149153260.jpg?2&w=900&t=st=1713724309~exp=1713724909~hmac=d42d621668208adc3b24c0fedc2552aeb2cf657e5d0ad358ca0fc10234d78f11")',
      }}
    >
      <div className="update-user-container" style={{ fontFamily: "Poppins, sans-serif" }}>
        {" "}
        {/* Apply the className here */}
        <h1>Update Your Reviews</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>UserName</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name || ""}
              required
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <div className="country-input">
              <input
                type="text"
                name="country"
                onChange={handleChange}
                value={inputs.country || ""}
                required
              />
              {inputs.country && (
                <ReactCountryFlag
                  countryCode={getCountryCode(inputs.country)}
                  className="country-flag"
                  svg
                />
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Review for Accommodations</label>
            <input
              type="text"
              name="accommodations"
              onChange={handleChange}
              value={inputs.accommodations || ""}
              required
            />
          </div>
          <div className="form-group">
            <label>Review for Destinations</label>
            <input
              type="text"
              name="destinations"
              onChange={handleChange}
              value={inputs.destinations || ""}
              required
            />
          </div>
          <div className="form-group">
            <label>Review for Activities</label>
            <input
              type="text"
              name="activities"
              onChange={handleChange}
              value={inputs.activities || ""}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateReview;
