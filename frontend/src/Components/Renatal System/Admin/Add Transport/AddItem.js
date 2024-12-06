import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddItem = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    contact: "",
    location: "",
    price: "",
    type: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if it's the contact field and value is a number
    if (name === "contact" && !isNaN(value)) {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    } else if (name !== "contact") {
      // For other fields, just update normally
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    // Name Validation
    if (!inputs.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(inputs.name)) {
      newErrors.name = "Name must contain only letters";
      valid = false;
    }

    // Image URL Validation
    if (!inputs.image.trim()) {
      newErrors.image = "Image URL is required";
      valid = false;
    }

    // Contact Validation
    if (!inputs.contact.trim()) {
      newErrors.contact = "Contact is required";
      valid = false;
    } else if (!/^\d{10}$/.test(inputs.contact)) {
      newErrors.contact = "Contact must be a 10-digit number";
      valid = false;
    }

    // Location Validation
    if (!inputs.location.trim()) {
      newErrors.location = "Location is required";
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(inputs.location)) {
      newErrors.location = "Location must contain only letters";
      valid = false;
    }

    // Price Validation
    if (!inputs.price.trim()) {
      newErrors.price = "Price is required";
      valid = false;
    } else if (isNaN(inputs.price) || Number(inputs.price) <= 0) {
      newErrors.price = "Price must be a positive number";
      valid = false;
    }

    // Type Validation
    if (!inputs.type.trim()) {
      newErrors.type = "Type is required";
      valid = false;
    }

    // Description Validation
    if (!inputs.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/items/", inputs); // Assuming the endpoint is correct
      alert("Item added successfully.");
      history("/admin-items"); // Navigate to items page after successful submission
    } catch (error) {
      console.error("Error submitting item:", error);
      setErrors({ submit: "Error adding item. Please try again." });
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Add New Item</h2>
      <form className="cart-form" onSubmit={handleSubmit}>
        <div>
          <label className="cart-label">Name:</label>
          <input
            className="cart-input"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <label className="cart-label">Image URL:</label>
          <input
            className="cart-input"
            type="text"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            required
          />
          {errors.image && <p className="error-message">{errors.image}</p>}
        </div>
        <div>
          <label className="cart-label">Contact:</label>
          <input
            className="cart-input"
            type="text"
            name="contact"
            value={inputs.contact}
            onChange={handleChange}
            required
          />
          {errors.contact && <p className="error-message">{errors.contact}</p>}
        </div>
        <div>
          <label className="cart-label">Location:</label>
          <input
            className="cart-input"
            type="text"
            name="location"
            value={inputs.location}
            onChange={handleChange}
            required
          />
          {errors.location && <p className="error-message">{errors.location}</p>}
        </div>
        <div>
          <label className="cart-label">Price:</label>
          <input
            className="cart-input"
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            required
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>
        <div>
          <label className="cart-label">Type:</label>
          <select
            className="cart-input-select"
            name="type"
            value={inputs.type}
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
          {errors.type && <p className="error-message">{errors.type}</p>}
        </div>

        <div>
          <label className="cart-label">Description:</label>
          <textarea
            className="cart-input"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            required
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <button className="viewbtn" type="submit">
          Add New Item
        </button>
        {errors.submit && <p className="error-message">{errors.submit}</p>}
      </form>
    </div>
  );
};

export default AddItem;
