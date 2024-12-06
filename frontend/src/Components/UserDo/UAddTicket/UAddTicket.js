import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UAddTicket.css";

//email validate part
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function UAddTicket() {
  const history = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];

  const [inputs, setInputs] = useState({
    dateCreated: currentDate,
    subject: "",
    description: "",
    touristInfo: {
      name: "",
      contactNumber: "",
      email: "",
      bookingID: "",
    },
    priority: "",
    category: "",
    attachments: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "touristInfo.name") {
      // Validate only letters are entered
      if (!/^[A-Za-z\s]+$/.test(value)) {
        setErrorMessage("Name should only contain letters");
        return;
      }
    }
//if invalid email
    if (name === "touristInfo.email") {
      if (!isEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }

    switch (name) {
      case "subject":
        newValue = value.slice(0, 60);
        break;
      case "description":
        newValue = value.slice(0, 1000);
        break;
      case "touristInfo.name":
        newValue = value.slice(0, 50);
        break;
      case "touristInfo.contactNumber":
        newValue = value.replace(/\D/g, "").slice(0, 10);
        break;
      case "priority":
        if (!["Low", "Medium", "High", "Urgent"].includes(value)) {
          setErrorMessage(
            "Invalid priority! Please select one of: Low, Medium, High, Urgent"
          );
          return;
        }
        break;
      case "category":
        if (
          ![
            "Accommodation",
            "Transportation",
            "Attractions/Tours",
            "General Inquiry",
            "Other",
          ].includes(value)
        ) {
          setErrorMessage(
            "Invalid category! Please select one of the provided options"
          );
          return;
        }
        break;
      default:
        break;
    }

    if (name.startsWith("touristInfo.")) {
      const nestedField = name.split(".")[1];
      setInputs((prevState) => ({
        ...prevState,
        touristInfo: {
          ...prevState.touristInfo,
          [nestedField]: newValue,
        },
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      setErrorMessage("Please fix the email error before submitting");
      return;
    }
    try {
      await sendRequest();
      history("/UTicketDetails");
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  const sendRequest = async () => {
    const formattedDate = new Date(inputs.dateCreated);
    await axios.post("http://localhost:5000/tickets", {
      dateCreated: formattedDate,
      subject: String(inputs.subject),
      description: String(inputs.description),
      touristInfo: inputs.touristInfo,
      priority: String(inputs.priority),
      category: String(inputs.category),
      attachments: String(inputs.attachments),
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Submit Ticket</h1>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Link to="/UTicketDetails" className="view-ticket-button">
          View Existing Tickets
        </Link>
        <Form onSubmit={handleSubmit}>
          <div className="input-details">
            <Form.Group controlId="dateCreated">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="dateCreated"
                onChange={handleChange}
                value={inputs.dateCreated}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                onChange={handleChange}
                value={inputs.subject}
                required
              />
            </Form.Group>
            <br />
            <Form.Group
              controlId="description"
              className="scrollable-description"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="description"
                onChange={handleChange}
                value={inputs.description}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="touristInfo">
              <br />
              <Form.Label>Tourist Info</Form.Label>
              <Form.Control
                type="text"
                name="touristInfo.name"
                placeholder="Name"
                onChange={handleChange}
                value={inputs.touristInfo.name}
                required
              />
              <br />
              <Form.Control
                type="text"
                name="touristInfo.contactNumber"
                placeholder="Contact Number"
                onChange={handleChange}
                value={inputs.touristInfo.contactNumber}
                required
              />
              <br />
              <Form.Control
                type="text"
                name="touristInfo.email"
                placeholder="Email"
                onChange={handleChange}
                value={inputs.touristInfo.email}
                required
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              <br />
              <Form.Control
                type="text"
                name="touristInfo.bookingID"
                placeholder="Booking ID(Optional)"
                onChange={handleChange}
                value={inputs.touristInfo.bookingID}
              />
              <br />
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                onChange={handleChange}
                value={inputs.priority}
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                onChange={handleChange}
                value={inputs.category}
                required
              >
                <option value="">Select Category</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Transportation">Transportation</option>
                <option value="Attractions/Tours">Attractions/Tours</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group controlId="attachments">
              <Form.Label>Attachment</Form.Label>
              <Form.Control
                type="text"
                name="attachments"
                placeholder="Attachement(Optional)"
                onChange={handleChange}
                value={inputs.attachments}
              />
            </Form.Group>
            <br />
          </div>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UAddTicket;
