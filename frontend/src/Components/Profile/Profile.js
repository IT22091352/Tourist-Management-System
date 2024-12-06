import React, { useEffect, useState } from "react";
import "./userprofile.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../NavBar/NavBar";
function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post("http://localhost:5000/userdeta", {
          token: token,
        });
        if (response.data.status === "ok") {
          setUser(response.data.data); // Set user data if status is ok
        } else {
          console.error("Error retrieving user details:", response.data.data);
        }
      } catch (error) {
        console.error("Error retrieving user details:", error.message);
      }
    }

    fetchUserDetails();
  }, []);

  const deleteHandler = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete account?"
    );

    if (userConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete("http://localhost:5000/userdeta", {
          data: { token: token },
        });
        if (response.data.status === "ok") {
          window.alert("Account details deleted successfully!");
          window.location.href = "/regi";
        } else {
          console.error("Error deleting account details:", response.data.data);
        }
      } catch (error) {
        console.error("Error deleting account details:", error.message);
      }
    }
  };

  return (
    <div>
      <Nav />

      <div className="main_profile_dash">
        <div className="add_drive_clas">
          <div className="add_drive_clas_sub">
            {user ? (
              <div>
                <h1 className="welcomnot-pro">
                  Welcome Back{" "}
                  <span className="welcomnot-pro-sub">{user.Firstname}</span>
                </h1>

                <div>
                  <p className="prodetil-topi">Profile Details</p>
                  <h3 className="prodetil-uname">
                    Full Name :{user.Firstname} {user.Lastname}
                  </h3>
                  <h3 className="prodetil-uname">Age :{user.Age}</h3>
                  <h3 className="prodetil-uname">Country : {user.Country}</h3>
                  <h3 className="prodetil-uname">Email :{user.Email}</h3>
                </div>
                <div className="actionbtn">
                  <div className="updt_action">
                    {user && (
                      <Link
                        className="btn_dash_admin_link"
                        to={`/profile/${user._id}`}
                      >
                        Edit
                      </Link>
                    )}
                  </div>
                  <div className="separator"></div>
                  <div onClick={deleteHandler} className="dlt_action">
                    Delete
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading user details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
