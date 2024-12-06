import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateBooking = () => {
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        arrivalDate: '', // Ensure this is initialized as an empty string
        members: '',
        vehicleName: '',
        guideNumber: '',
        places: '',
        days: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooking();
    }, [id]);

    const fetchBooking = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/bookings/getBooking/${id}`);
            const data = response.data;
            // Convert the date to ISO format to ensure compatibility with HTML date input
            data.arrivalDate = new Date(data.arrivalDate).toISOString().substr(0, 10);
            setBookingDetails(data);
        } catch (error) {
            console.error('Error fetching booking details:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'members' || name === 'guideNumber' || name === 'days') {
            // Check if input is a positive number or empty string (allowing backspace)
            if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
                setBookingDetails(prev => ({
                    ...prev,
                    [name]: value,
                }));
            }
        } else {
            setBookingDetails(prev => ({
                ...prev,
                [name]: name === 'arrivalDate' ? new Date(value).toISOString().substr(0, 10) : value,
            }));
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/bookings/updateBooking/${id}`, bookingDetails);
            alert('Booking updated successfully!');
            navigate('/booking');
        } catch (error) {
            console.error('Error updating booking:', error.response.data.message);
            // Display the error message to the user or handle it accordingly
        }
    };

    const { name, email, phone, arrivalDate, members, vehicleName, guideNumber, places, days } = bookingDetails;

    return (
        <div className="my-4 p-5 m-5">
            <div className="card p-4">
                <h1 className="text-center">Update Booking</h1>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control w-100" id="name" name="name" value={name} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control w-100" id="email" name="email" value={email} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control w-100" id="phone" name="phone" value={phone} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="arrivalDate" className="form-label">Arrival Date</label>
                        <input type="date" className="form-control w-100" id="arrivalDate" name="arrivalDate" value={arrivalDate} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="members" className="form-label">Members</label>
                        <input type="number" className="form-control w-100" id="members" name="members" value={members} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vehicleName" className="form-label">Vehicle Name</label>
                        <input type="text" className="form-control w-100" id="vehicleName" name="vehicleName" value={vehicleName} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="guideNumber" className="form-label">Guide Number</label>
                        <input type="text" className="form-control w-100" id="guideNumber" name="guideNumber" value={guideNumber} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="places" className="form-label">Places</label>
                        <input type="text" className="form-control w-100" id="places" name="places" value={places} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="days" className="form-label">Days</label>
                        <input type="number" className="form-control w-100" id="days" name="days" value={days} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Booking</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateBooking;