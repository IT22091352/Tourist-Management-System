import React from 'react';
import { Link } from 'react-router-dom';
import './AdminLPage.css';


function AdminLPage() {
    return (
        <div className="container m-0">

            <h1 className="heading">Contact Us</h1>

            <div className="box-container">

                <div className="box">
                    <h3>Answer Ticket</h3>
                    <p>You are encouraged to review and respond to customer inquiries on this page</p>
                    <Link to="/ACrudApp" className="btn">Answer</Link>
                </div>

                <div className="box">
                    <h3>View Ticket List</h3>
                    <p>You are encouraged to review and respond to customer inquiries on this page</p>
                    <Link to="/ATicketDetails" className="btn">View Tickets</Link>
                </div>

                <div className="box">
                    <h3>Add FAQs</h3>
                    <p>You have the option to incorporate FAQs into this page for enhanced clarity and user assistance</p>
                    <Link to="/FAQdetails" className="btn">Add</Link>
                </div>

            </div>

        </div>
    );
}

export default AdminLPage;
