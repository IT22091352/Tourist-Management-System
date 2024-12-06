import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BookingDetails = () => {
    const { id } = useParams();
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/getBooking/${id}`);
                setBookingData(response.data);
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookingData();
    }, [id]);

    if (!bookingData) {
        return <div>Loading...</div>;
    }

    // Function to format date to display only the date part
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
    };

    return (
        <div className="my-4 m-4 p-4">
            <div className="row">
                {/* <div className="col-md-1">
                    <Link to="/bookings" className="btn btn-primary" style={{ backgroundColor: '#035B83' }}>
                        &larr; Back
                    </Link>
                </div> */}
            </div>
            <h2 className="mb-4 m-0">Booking Details</h2>
            <div className="card">
                <div className="card-body">
                    <p className="card-text"><strong>Name:</strong> {bookingData.name}</p>
                    <p className="card-text"><strong>Email:</strong> {bookingData.email}</p>
                    <p className="card-text"><strong>Phone:</strong> {bookingData.phone}</p>
                    <p className="card-text"><strong>Arrival Date:</strong> {formatDate(bookingData.arrivalDate)}</p>
                    <p className="card-text"><strong>Members:</strong> {bookingData.members}</p>
                    <p className="card-text"><strong>Vehicle Name:</strong> {bookingData.vehicleName}</p>
                    <p className="card-text"><strong>Guide Number:</strong> {bookingData.guideNumber}</p>
                    <p className="card-text"><strong>Places:</strong> {bookingData.places}</p>
                    <p className="card-text"><strong>Days:</strong> {bookingData.days}</p>
                </div>
            </div>
        </div>
    );
}

export default BookingDetails;