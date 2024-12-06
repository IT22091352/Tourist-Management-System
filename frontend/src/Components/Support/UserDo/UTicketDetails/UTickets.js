import React, { useEffect, useState } from "react";
import axios from "axios";
import UTicketF from "../UTicketF/UTicketF";
import "./UTickets.css";

const URL = "http://localhost:5000/tickets";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function UTickets() {
  const [tickets, setTickets] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setTickets(data.tickets));
  }, []);

  return (
    <div className="tickets-container">
      <h1 className="page-title">Ticket Details</h1>
      <div className="tickets-list">
        {tickets &&
          tickets.map((ticket, i) => (
            <div className="ticket-item" key={i}>
              
              <UTicketF ticket={ticket} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default UTickets;
