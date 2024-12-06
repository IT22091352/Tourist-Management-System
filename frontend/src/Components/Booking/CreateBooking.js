// CreateBooking.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './images/img1.jfif';
import { useNavigate } from 'react-router-dom';
import image2 from './images/img2.jfif';

const CreateBooking = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        arrivalDate: '',
        members: '',
        vehicleName: '',
        guideNumber: '',
        places: '',
        days: '',
    });
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        nameError: '',
        emailError: '',
        phoneError: '',
        memberError: '',
        guidNumberError: '',
        daysError: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'members' || name === 'guideNumber' || name === 'days') {
            // Check if input is a positive number or empty string (allowing backspace)
            if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value,
                }));
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };    

    const validateName = (name) => {
        const namePattern = /^[A-Za-z]+$/;
        return namePattern.test(name);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    const validateDate = (date) => {
        const selectedDate = new Date(date);
        const currentDate = new Date();
        return selectedDate >= currentDate;
    };

    const validateNumber = (value) => {
        return !isNaN(value) && parseInt(value) > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors({
            nameError: '',
            emailError: '',
            phoneError: '',
            memberError: '',
            guidNumberError: '',
            daysError: '',
        });

        const {
            name,
            email,
            phone,
            arrivalDate,
            members,
            guideNumber,
            days,
        } = formData;

        // Validate name, email, phone, and date (similar to your existing validation code)

        // Validate members
        if (!validateNumber(members)) {
            setValidationErrors((prevState) => ({
                ...prevState,
                memberError: 'Please enter a valid number of members',
            }));
            return;
        }

        // Validate guide number
        if (!validateNumber(guideNumber)) {
            setValidationErrors((prevState) => ({
                ...prevState,
                guidNumberError: 'Please enter a valid guide number',
            }));
            return;
        }

        // Validate days
        if (!validateNumber(days)) {
            setValidationErrors((prevState) => ({
                ...prevState,
                daysError: 'Please enter a valid number of days',
            }));
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/bookings/addBooking', formData);
            alert('Booking added successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                arrivalDate: '',
                members: '',
                vehicleName: '',
                guideNumber: '',
                places: '',
                days: '',
            });
            console.log('Response:', res.data);
            
            navigate('/booking');
            // Navigate to bookings page
           
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError('Invalid input. Please check your data.');
            } else {
                setError('An error occurred. Please try again later.');
            }
            console.error(err);
        }
    };

    return (
        <div className="my-4">
            <div className="row">
                <div className="col-md-1">
                    <Link to="/booking" className="btn btn-primary" style={{ backgroundColor: '#035B83' }}>
                        &larr; Back
                    </Link>
                </div>
                <div className="col-md-5">
                    <div className="card p-4" style={{ border: '2px solid #53B5E6', backgroundColor: '#BFDCFE' }}>
                        <h2 className="m-0 mb-4 text-center">Add New Booking</h2>
                        <form onSubmit={handleSubmit}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control w-100" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                {validationErrors.nameError && <div className="text-danger">{validationErrors.nameError}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control w-100" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                {validationErrors.emailError && <div className="text-danger">{validationErrors.emailError}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="tel" className="form-control w-100" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                                {validationErrors.phoneError && <div className="text-danger">{validationErrors.phoneError}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="arrivalDate" className="form-label">Arrival Date</label>
                                <input type="date" className="form-control w-100" id="arrivalDate" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} required />
                                {validationErrors.daysError && <div className="text-danger">{validationErrors.daysError}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="members" className="form-label">Members</label>
                                <input type="number" className="form-control w-100" id="members" name="members" value={formData.members} onChange={handleChange} required />
                                {validationErrors.memberError && <div className="text-danger">{validationErrors.memberError}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="vehicleName" className="form-label">Vehicle Name</label>
                                <input type="text" className="form-control w-100" id="vehicleName" name="vehicleName" value={formData.vehicleName} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="guideNumber" className="form-label">Guide Number</label>
                                <input type="number" className="form-control w-100" id="guideNumber" name="guideNumber" value={formData.guideNumber} onChange={handleChange} required />
                                {validationErrors.guidNumberError && <div className="text-danger">{validationErrors.guidNumberError}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="places" className="form-label">Places</label>
                                <input type="text" className="form-control w-100" id="places" name="places" value={formData.places} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="days" className="form-label">Days</label>
                                <input type="number" className="form-control w-100" id="days" name="days" value={formData.days} onChange={handleChange} required />
                                {validationErrors.daysError && <div className="text-danger">{validationErrors.daysError}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">Add Booking</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-between">
                    <div className="mb-3">
                        <img src={image1} alt="Image 1" className="img-fluid rounded" style={{ height: 'calc(100% - 20px)' }} />
                    </div>
                    <div>
                        <img src={image2} alt="Image 2" className="img-fluid rounded" style={{ height: 'calc(100% - 20px)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBooking;
