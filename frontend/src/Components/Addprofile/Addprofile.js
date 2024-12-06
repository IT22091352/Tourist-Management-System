import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Addprofile/Addprofile.css'; // Import the CSS file

function Addprofile(props) {
  const { _id, Firstname, Lastname, Age, Country, Email, Password } = props.regi || {};

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/regi/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/profile"));
  }

  return (
    <div className="user-details-page"> {/* Apply user-details-page class */}
      <h1>User Details</h1>
      {/* User details */}
      <h1>Id: {_id}</h1>
      <h1>Name: {Firstname}</h1>
      <h1>Last: {Lastname}</h1>
      <h1>Age: {Age}</h1>
      <h1>Country: {Country}</h1>
      <h1>Email: {Email}</h1>
      <h1>Password: {Password}</h1>
      <div className="buttons-container">
      <Link to={`/profile/${_id}`}>Update</Link>
        <button onClick={deleteHandler} className="delete-button">Delete</button>
      </div>
    </div>
  );
}

export default Addprofile;
