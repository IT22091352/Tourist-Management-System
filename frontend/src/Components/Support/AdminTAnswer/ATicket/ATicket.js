import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ATicket.css'; // Import your CSS file for styling

function ATicket(props) {
  const { ticket } = props;

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/tickets/${_id}`)
      .then(res => res.data)
      .then(() => history('/TicketDetails'));
  }

  // Return early if ticket prop is undefined
  if (!ticket) {
    return <div>Loading...</div>; // Or any other fallback UI
  }

  // Destructure properties from ticket
  const { ticketID, dateCreated, subject, description, touristInfo, priority, category, attachments, answer, _id } = props.ticket;

  const formattedDate = new Date(dateCreated).toLocaleDateString();

  const handleAnswerClick = () => {
    history(`/ATicketDetails/${_id}`);
  };

  return (
    <div className="container all-ticket">
      <h1></h1>
      <div className="ticket-info">
        <p><strong>ID:</strong> {ticketID}</p>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>ToursitInfo:</strong> {touristInfo.name}</p>
        <p><strong>Priority:</strong> {priority}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Attachment:</strong> {attachments}</p>
        <p><strong>Answer:</strong> {answer}</p>
      </div>
      {answer ? (
        <Button onClick={deleteHandler} variant="primary"> Remove </Button>
      ) : (
        <Button onClick={handleAnswerClick} variant="primary" >Answer</Button>
      )}
    </div>
  );
}

export default ATicket;
