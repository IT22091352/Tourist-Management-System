import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../admin.css";
import { useReactToPrint } from "react-to-print";

const Item = ({ item, onDelete, isPrinting }) => {
  const { _id, name, image, contact, location, age, language, description } = item;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/guides/${_id}`);
        onDelete(_id);
        alert("Item deleted successfully.");
        window.location.reload();
      } catch (error) {
        // Handle error and provide feedback to the user
      }
    }
  };

  return (
    <tr>
      <td className="admin_tbl_td">
        <img src={image} alt={name} style={{ width: "50px", height: "50px" }} />
      </td>
      <td className="admin_tbl_td">{name}</td>
      <td className="admin_tbl_td">{contact}</td>
      <td className="admin_tbl_td">{location}</td>
      <td className="admin_tbl_td">{age}</td>
      <td className="admin_tbl_td">{language}</td>
      <td className="admin_tbl_td">{description}</td>
      {!isPrinting && (
        <td className="admin_tbl_td">
          <button className="dltbtn" onClick={handleDelete}>
            Delete
          </button>
          <Link className="updtbtn" to={`/update-guide/${_id}`}>
            Update
          </Link>
        </td>
      )}
    </tr>
  );
};

const Guides = () => {
  const [items, setItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/guides");
      setItems(response.data.items);
    } catch (error) {
      setAlertMessage("Error fetching items."); // Display error message to the user
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/guides/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      alert("Item deleted successfully.");
    } catch (error) {
      // Handle error and provide feedback to the user
    }
  };

  const handleSearch = () => {
    const filtered = items.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setItems(filtered);
    setNoResults(filtered.length === 0);
  };

  /* PDF Function */
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Items Report",
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      alert("Guides Report Successfully Downloaded!");
    },
  });

  return (
    <div>
      <h1 className="cart-header">Tour Guides List</h1>
      {alertMessage && <div style={{ color: "red" }}>{alertMessage}</div>}
      <div className="tbldetsil">
        <div className="search_pdf_div">
          <button
            onClick={() => (window.location.href = "/add-guide")}
            className="updtbtn"
            style={{ height: "40px" }}
          >
            Add New Tour Guide
          </button>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              className="serch"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="updtbtn">
              Search
            </button>
          </div>
        </div>

        <table ref={componentRef} className="table_details_admin">
          <thead>
            <tr>
              <th className="admin_tbl_th">Image</th>
              <th className="admin_tbl_th">Name</th>
              <th className="admin_tbl_th">Contact</th>
              <th className="admin_tbl_th">Location</th>
              <th className="admin_tbl_th">Age</th>
              <th className="admin_tbl_th">Language</th>
              <th className="admin_tbl_th">Description</th>
              {!isPrinting && <th className="admin_tbl_th">Action</th>}
            </tr>
          </thead>
          {!noResults && (
            <tbody>
              {items.map((item) => (
                <Item key={item._id} item={item} onDelete={handleDelete} isPrinting={isPrinting} />
              ))}
            </tbody>
          )}
        </table>
        {noResults && (
          <div>
            <br />
            <h1 className="con_topic">
              No <span className="clo_us">Results</span> Found
            </h1>
          </div>
        )}
        <div className="report">
          <button onClick={handlePrint} className="updtbtn">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guides;
