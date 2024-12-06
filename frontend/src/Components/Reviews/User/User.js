import React from "react";
import { Link } from "react-router-dom";
import "./User.css";

function User(props) {
  const {
    _id,
    name,
    country,
    accommodations,
    destinations,
    activities,
    accommodationsRating,
    destinationsRating,
    activitiesRating,
  } = props.user;
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h1 style={{ fontFamily: "Poppins, sans-serif" }}>
        {name} : {country}
      </h1>
      <br />

      <p style={{ fontFamily: "Poppins, sans-serif" }}>ID: {_id}</p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>User: {name}</p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>Country: {country}</p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>
        Accommodations: {accommodations}
      </p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>
        Destinations: {destinations}
      </p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>
        Activities: {activities}
      </p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>
        AccommodationsRating: {accommodationsRating}
      </p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>
        DestinationsRating:{destinationsRating}{" "}
      </p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>
        ActivitiesRating : {activitiesRating}
      </p>

      <br></br>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>Date: {currentDate}</p>
      <br></br>
      <button style={{ backgroundColor: "#143a64" }}>
        {" "}
        <Link
          to={`/seereviews/${_id}`}
          style={{
            fontFamily: "Poppins, sans-serif",
            textDecoration: "none",
            color: "white",
          }}
        >
          Update{" "}
        </Link>
      </button>

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default User;
