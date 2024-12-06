import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    image: "",
    contact: "",
    location: "",
    price: "",
    type: "",
    description: "",
  });
  const [errors, setErrors] = useState({}); // State to hold validation errors

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/items/${id}`);
      setItem(response.data.item);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
    // Clear validation error when input changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation before submitting
    const validationErrors = {};
    if (!item.name) {
      validationErrors.name = "Name is required";
    }
    if (!item.image) {
      validationErrors.image = "Image URL is required";
    }
    if (!/^\d+$/.test(item.contact) || item.contact.length !== 10) {
      validationErrors.contact = "Valid 10-digit contact number is required";
    }
    if (!item.location) {
      validationErrors.location = "Location is required";
    }
    if (!item.price || isNaN(item.price) || parseFloat(item.price) <= 0) {
      validationErrors.price = "Valid price is required";
    }
    if (!item.type) {
      validationErrors.type = "Type is required";
    }
    if (!item.description) {
      validationErrors.description = "Description is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Don't proceed with submission if there are validation errors
    }
    try {
      await axios.put(`http://localhost:5000/items/${id}`, item);
      alert("Item updated successfully.");
      navigate("/admin-items");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Update Item</h1>
      <form className="cart-form" onSubmit={handleSubmit}>
        <div>
          <label className="cart-label">Name:</label>
          <br />
          <input
            className="cart-input"
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label className="cart-label">Image:</label>
          <br />
          <input
            className="cart-input"
            type="text"
            name="image"
            value={item.image}
            onChange={handleChange}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <div>
          <label className="cart-label">Contact:</label>
          <br />
          <input
            className="cart-input"
            type="text"
            name="contact"
            value={item.contact}
            onChange={handleChange}
          />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </div>
        <div>
          <label className="cart-label">Location:</label>
          <br />
          <input
            className="cart-input"
            type="text"
            name="location"
            value={item.location}
            onChange={handleChange}
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
        <div>
          <label className="cart-label">Price:</label>
          <br />
          <input
            className="cart-input"
            type="text"
            name="price"
            value={item.price}
            onChange={handleChange}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div>
          <label className="cart-label">Type:</label>
          <br />
          <select
            className="cart-input-select"
            name="type"
            value={item.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            <option value="van">Van</option>
            <option value="bus">Bus</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="bicycle">Bicycle</option>
            <option value="train">Train</option>
            <option value="plane">Plane</option>
            <option value="boat">Boat</option>
            <option value="campervan">Campervan</option>
            <option value="tent">Tent</option>
            <option value="backpack">Backpack</option>
            <option value="camera">Camera</option>
            <option value="binoculars">Binoculars</option>
            <option value="maps">Maps</option>
            <option value="compass">Compass</option>
            <option value="GPS">GPS</option>
            <option value="luggage">Luggage</option>
            <option value="sleeping bag">Sleeping Bag</option>
            <option value="tent">Tent</option>
            <option value="cooler">Cooler</option>
            <option value="flashlight">Flashlight</option>
            <option value="water bottle">Water Bottle</option>
            <option value="sunscreen">Sunscreen</option>
            <option value="hat">Hat</option>
            <option value="sunglasses">Sunglasses</option>
            <option value="first aid kit">First Aid Kit</option>
            <option value="bug spray">Bug Spray</option>
            <option value="binoculars">Binoculars</option>
            <option value="umbrella">Umbrella</option>
            <option value="towel">Towel</option>
          </select>
          {errors.type && <span className="error">{errors.type}</span>}
        </div>
        <div>
          <label className="cart-label">Description:</label>
          <br />
          <textarea
            className="cart-input"
            name="description"
            value={item.description}
            onChange={handleChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <button type="submit" className="viewbtn">
          Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
