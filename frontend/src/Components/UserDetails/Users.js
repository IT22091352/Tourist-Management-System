import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import User from "../User/User";
import { useReactToPrint } from "react-to-print";
import "../UserDetails/Users.css";
import "./Users.css";

const URL = 'http://localhost:5000/api/users';

// Function to fetch users from the API
const fetchUsers = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.users || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  // Function to load users
  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
    setNoResults(data.length === 0);
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Users Report',
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
  });

  const handleSearch = async () => {
    const data = await fetchUsers();
    const filteredUsers = data.filter((user) =>
      Object.values(user).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };

  const handleSendReport = () => {
    // Send report function logic
    const phoneNumber = '+94714153371'; // Make this dynamic if necessary
    const message = 'Selected User Report';
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="my-2">
      <div className="ful_detail_box">
        <h1 className="topic_auth">
          User <span className="sub_auth">Details</span>
        </h1>
        <br/>
        <div className="row align-items-center">
          <div className="col-md-4 mb-3 d-flex justify-content-center align-items-center">
            <button
              onClick={() => (window.location.href = "/Adduser")}
              className="btn btn-primary btn-lg btn-block"
            >
              Add User
            </button>
          </div>
          <div className="col-md-6 mb-3">
            <div className="input-group d-flex justify-content-center align-items-center">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                className="form-control"
                name="Search"
                placeholder="Search User Details"
              />
              <div className="input-group-append d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={handlePrint}
            >
              Download Report
            </button>
          </div>
        </div>

        {noResults ? (
          <div className="no-results mt-4">
            <h1>No users available</h1>
          </div>
        ) : (
          <div ref={componentRef}>
            <table className="table table-striped table_details_admin mt-4">
              <thead>
                <tr>
                  <th className="admin_tbl_th">ID</th>
                  <th className="admin_tbl_th">First Name</th>
                  <th className="admin_tbl_th">Last Name</th>
                  <th className="admin_tbl_th">Age</th>
                  <th className="admin_tbl_th">Country</th>
                  <th className="admin_tbl_th">Email</th>
                  {!isPrinting && (
                  <th className="admin_tbl_th">Actions</th>
                )}
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <User key={user.id} user={user} isPrinting={isPrinting} />
                ))}
              </tbody>
            </table>
          </div>
        )}
         <div class="text-center">
                    <button
                        class="btn btn-primary btn-lg btn_dash_admin"
                        onClick={handleSendReport}
                    >
                        Send Message
                    </button>
                </div>
      </div>
    </div>
  );
}

export default Users;
