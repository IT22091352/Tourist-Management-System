import React, { useEffect, useState, useRef } from 'react'; 
import axios from "axios";
import Ticket from '../ATicket/ATicket';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReactToPrint } from "react-to-print";
import './ATickets.css'; // Import your CSS file for styling

const URL = "http://localhost:5000/tickets";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ATickets() {
  const [tickets, setTickets] = useState();
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);


  useEffect(() => {
    fetchHandler().then((data) => setTickets(data.tickets));
  }, []);

  const handleSearch = () => {
    const result = tickets.filter(ticket => ticket.ticketID === parseInt(searchInput));
    setSearchResult(result);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Report Genaration
  
const ComponentsRef=useRef();
const handlePrint=useReactToPrint({
    content: ()=> ComponentsRef.current,
    DocumentTitle:"All Tickets Report",
    onafterprint:()=>alert("Report Successfully Download !"),

});


  return (
    <div className="container-fluid m-0">
      <h1>All Ticket Details</h1>
      
      <div className="search-bar">
        <input type="text" value={searchInput} onChange={handleChange} placeholder="Enter Ticket ID" /> {"  "}
        <Button onClick={handleSearch} variant="info" >Search</Button>{"  "}
        <Button onClick={handlePrint} style={{  }}  >Download Report</Button>
      </div>
      <div ref={ComponentsRef} className="ticket-list">
        {searchResult.length > 0 ? (
          searchResult.map((ticket, i) => (
            <div key={i}>
              <Ticket ticket={ticket} />
            </div>
          ))
        ) : (
          tickets && tickets.map((ticket, i) => (
            <div key={i}>
              <Ticket ticket={ticket} />
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}

export default ATickets;
