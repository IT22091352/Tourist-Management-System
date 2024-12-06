import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AUser.css";

function AUser(props) {
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

  const fetchUsers = props.fetchUsers

  const currentDate = new Date().toISOString().split("T")[0];

  const history = useNavigate();


  //  Deletion Function
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/users/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/adminseereviews"))
      .then(()=> fetchUsers());
  };

  
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
        accommodationsRating: {accommodationsRating}
      </p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>
        destinationsRating:{destinationsRating}{" "}
      </p>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>
        activitiesRating : {activitiesRating}
      </p>

      <br></br>
      <p style={{ fontFamily: "Poppins, sans-serif" }}>Date: {currentDate}</p>
      <br></br>
      <Link
        to={`/adminseereviews/${_id}`}
        style={{
          fontFamily: "Poppins, sans-serif",
          textDecoration: "none",
          color: "blue",
        }}
      >
        {" "}
      </Link>
      <button
        onClick={deleteHandler}
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default AUser;
