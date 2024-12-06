import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UTicketF.css"; 

function UTicketF(props) {
  const { ticket } = props;
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/tickets/${ticket._id}`)
      .then((res) => res.data)
      .then(() => history("/UTicketDetails"));
  };

  // Return early if ticket prop is undefined
  if (!ticket) {
    return <div>Loading...</div>; // Or any other fallback UI
  }

  // Destructure properties from ticket
  const {
    ticketID,
    dateCreated,
    subject,
    description,
    touristInfo,
    priority,
    category,
    attachments,
    answer,
    _id,
  } = props.ticket;

  const formattedDate = new Date(dateCreated).toLocaleDateString(); //remove time zone

  return (
    <div className=" user-ticket">
      <h1>Available Ticket </h1>
      <div className="ticket-info">
        <p>
          <strong>Ticket ID:</strong> {ticketID}
        </p>
        <p>
          <strong>Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>Email:</strong> {touristInfo.email}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Subject:</strong> {subject}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <p>
          <strong>Priority:</strong> {priority}
        </p>
        <p>
          <strong>Attachments:</strong> {attachments}
        </p>
        {answer ? (
          <div className="answer-box">
            <p>
              <strong>Answer:</strong>
            </p>
            <div className="answer">{answer}</div>
          </div>
        ) : (
          <p style={{ color: "red" }}>Ticket Under Review</p>
        )}
      </div>
      <div className="buttons">
        <Link to={`/UTicketDetails/${_id}`} className="btn btn-primary mr-2">
          Renew
        </Link>{" "}
        {""}
        <Button onClick={deleteHandler} variant="danger">
          Remove
        </Button>
      </div>
    </div>
  );
}

export default UTicketF;
