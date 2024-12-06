import React, { useState, useEffect, useRef } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import AUser from "./AUser";
import { useReactToPrint } from "react-to-print";
import StarRating from "../StarRating/StarRating";
import "./Admin.css";

const URL = "http://localhost:5000/users";

function ReviewAdmin() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [averageRatings, setAverageRatings] = useState({
    accommodations: 0,
    destinations: 0,
    activities: 0,
    accommodationsRating: 0,
    destinationsRating: 0,
    activitiesRating: 0,
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(URL);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // Fetch user data from the server
  useEffect(() => {
    

    fetchUsers();
  }, []);



  // Calculate average ratings
  useEffect(() => {
    const calculateAverageRatings = () => {
      if (users.length === 0) return;

      const totalAccommodations = users.reduce(
        (acc, user) => acc + user.accommodationsRating,
        0
      );
      const totalDestinations = users.reduce(
        (acc, user) => acc + user.destinationsRating,
        0
      );
      const totalActivities = users.reduce(
        (acc, user) => acc + user.activitiesRating,
        0
      );

      const averageAccommodations = totalAccommodations / users.length;
      const averageDestinations = totalDestinations / users.length;
      const averageActivities = totalActivities / users.length;

      setAverageRatings({
        accommodations: isNaN(averageAccommodations)
          ? 0
          : averageAccommodations,
        destinations: isNaN(averageDestinations) ? 0 : averageDestinations,
        activities: isNaN(averageActivities) ? 0 : averageActivities,
      });
    };

    calculateAverageRatings();
  }, [users]);



  //Print
  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Users Reviews Report",
    onAfterPrint: () => alert("Users Review Report Successfully Downloaded!"),
  });



  //Search
  const handleSearch = () => {
    const filtered = users.filter((user) =>
      Object.values(user).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setNoResults(filtered.length === 0);
  };

  
  return (
    <div className="users-page">
      {" "}
      {/* Add a className for the page container */}
      <Nav />
      <div
        className="users-container"
        style={{ backgroundImage: 'url("path_to_your_image.jpg")' }}
      >
        {" "}
        {/* Add the background image style */}
        <h1 className="page-title" style={{ fontFamily: "Roboto, sans-serif" }}>
          Customers Reviews & Ratings
        </h1>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        <div
          className="average-ratings"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <h2>Average Ratings</h2>
          <div className="rating-box">
            <h4>Accommodations</h4>
            <p>{averageRatings.accommodations.toFixed(2)} / 5</p>
            <StarRating value={averageRatings.accommodations} />
          </div>
          <div className="rating-box">
            <h4>Destinations</h4>
            <p>{averageRatings.destinations.toFixed(2)} / 5</p>
            <StarRating value={averageRatings.destinations} />
          </div>
          <div className="rating-box">
            <h4>Activities</h4>
            <p>{averageRatings.activities.toFixed(2)} / 5</p>
            <StarRating value={averageRatings.activities} />
          </div>
        </div>
        {noResults ? (
          <div>
            <p>No Users Found</p>
          </div>
        ) : (
          <div className="user-list" ref={componentsRef}>
            {filteredUsers.length > 0
              ? filteredUsers.map((user, i) => (
                  <div key={i} className="user-card">
                    <AUser user={user} fetchUsers={fetchUsers}/>
                  </div>
                ))
              : users.map((user, i) => (
                  <div key={i} className="user-card">
                    <AUser user={user} fetchUsers={fetchUsers}/>
                  </div>
                ))}
          </div>
        )}
        <button onClick={handlePrint} className="print-button">
          Download Report
        </button>
      </div>
    </div>
  );
}
export default ReviewAdmin;
