import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UUpdateTicket.css";

// Email validation function
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function UUpdateTicket() {
  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const history = useNavigate();
  const { id } = useParams();

  // Function to set the current date
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/tickets/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setInputs({
            ...data.ticket,
            dateCreated: new Date().toISOString().split("T")[0], // Set current date
          });
        });
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/tickets/${id}`, inputs); // Send the updated ticket directly
      history("/UTicketDetails");
    } catch (error) {
      setErrorMessage("Failed to update ticket. Please try again later."); // Set error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "touristInfo.email") {
      // Validate email only if the email being edited
      if (!isEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
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
    await sendRequest();
  };

  return (
    <div className="container">
      <h1>Edit Ticket</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
      {/* Display error  */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="ticketID">
          <Form.Label>TicketID</Form.Label>
          <Form.Control
            type="text"
            name="ticketID"
            onChange={handleChange}
            value={inputs.ticketID || ""}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="dateCreated">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="dateCreated"
            onChange={handleChange}
            value={inputs.dateCreated || ""}
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
            value={inputs.subject || ""}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={handleChange}
            value={inputs.description || ""}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="touristInfo">
          <Form.Label>Tourist Info</Form.Label>
          <br></br>
          <Form.Control
            type="text"
            name="touristInfo.name"
            placeholder="Name"
            onChange={handleChange}
            value={inputs.touristInfo?.name || ""}
            required
          />
          <br />
          <Form.Control
            type="text"
            name="touristInfo.contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
            value={inputs.touristInfo?.contactNumber || ""}
            required
          />
          <br />
          <Form.Control
            type="text"
            name="touristInfo.email"
            placeholder="Email"
            onChange={handleChange}
            value={inputs.touristInfo?.email || ""}
            required
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <br />
          <Form.Control
            type="text"
            name="touristInfo.bookingID"
            placeholder="Booking ID"
            onChange={handleChange}
            value={inputs.touristInfo?.bookingID || ""}
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
          <br></br>
        </Form.Group>
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
            onChange={handleChange}
            value={inputs.attachments || ""}
            required
          />
        </Form.Group>
        <br />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UUpdateTicket;
