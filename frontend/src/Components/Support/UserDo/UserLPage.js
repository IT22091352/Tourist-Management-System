import React from "react";
import { Link } from "react-router-dom";
import "./UserLPage.css";

const handleSendReport = () => {
  const phoneNumber = "+94725792757";
  const message = `I have a Question!!!!!`;
  const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  window.open(WhatsAppUrl, "_blank");
};

function UserLPage() {
  return (
    <div className="w-100 d-flex justify-content-center m-2">
    <div className="m-0 container">
      <h1 className="heading">Contact Us</h1>

      <div className="box-container">
        <div className="box">
          <h3> Ticket</h3>
          <p>
            Please submit your issue, and our team is readily available to
            provide assistance and support.
          </p>
          <Link to="/UAddTicket" className="btn">
            Add New Ticket
          </Link>
        </div>

        <div className="box">
          <h3>FAQs</h3>
          <p>
            Discover answers to frequently asked questions right here for quick
            and easy solutions.
          </p>
          <Link to="/UFAQdetails" className="btn">
            read more
          </Link>
        </div>

        <div className="box">
          <h3>Contact Support Agent Live</h3>
          <p>
            If further assistance is required, please feel free to contact us by
            phone.
          </p>
          <a className="btn" href="tel:+94781001286">
            Call Now
          </a>
        </div>

        <div className="box">
          <h3>Live Chat</h3>
          <p>
            We're available on WhatsApp if you need assistance. Reach out
            anytime.
          </p>
          <a className="btn" on onClick={handleSendReport}>
            Message
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserLPage;
