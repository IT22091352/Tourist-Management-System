import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsInfo, BsPencilSquare, BsTrash } from 'react-icons/bs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BookingsAdmin = () => {
    const [bookings, setBookings] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredBookings, setFilteredBookings] = useState([]);
    const navigate = useNavigate();

    const fetchBookings = async () => {
        console.log("hei")
        try {
            const response = await fetch('http://localhost:5000/api/bookings/getAllBookings');
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data);
            setFilteredBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/deleteBooking/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }
            const data = await response.json();
            console.log(data);
            fetchBookings();
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };
    
    const handleSearchInputChange = (e) => {
        const searchTerm = e.target.value.toLowerCase(); // Convert the search term to lowercase
        setSearchInput(searchTerm);
        if (searchTerm === '') {
            // If search term is empty, show all bookings
            setFilteredBookings(bookings);
        } else {
            // Otherwise, filter bookings based on search term
            const filtered = bookings.filter(booking =>
                (booking.name && booking.name.toLowerCase().includes(searchTerm)) ||
                (booking.email && booking.email.toLowerCase().includes(searchTerm))
            );
            setFilteredBookings(filtered);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleUpdate = (id) => {
        navigate(`/update-booking/${id}`);
    };

    const handleDownloadReport = () => {
        const doc = new jsPDF();
        const tableRows = [];
        
        // Add table headers
        const headers = [
            'No.', 'Name', 'Email', 'Phone', 'Arrival Date', 'Members', 
            'Vehicle Name', 'Guide Number', 'Places', 'Days'
        ];
        tableRows.push(headers);

        // Add booking data to tableRows
        filteredBookings.forEach((booking, index) => {
            const rowData = [
                index + 1,
                booking.name,
                booking.email,
                booking.phone,
                new Date(booking.arrivalDate).toLocaleDateString(),
                booking.members,
                booking.vehicleName,
                booking.guideNumber,
                booking.places,
                booking.days
            ];
            tableRows.push(rowData);
        });

        // Set font style and table options
        doc.setFontSize(12);
        doc.text('Booking Report', 14, 15);
        doc.autoTable({
            startY: 20,
            head: [tableRows[0]],
            body: tableRows.slice(1),
        });

        // Save the PDF
        doc.save('booking_report.pdf');
    };

    return (
        <div className="my-4 p-4">
            <h2 className="text-center display-flex justify-content-center mx-0">Bookings</h2>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    
                    <button className="btn btn-success" onClick={handleDownloadReport}>Download Report</button>
                </div>
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Search by Name or Email"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        className="form-control me-2"
                        style={{ width: '400px' }}
                    />
                </div>
            </div>

            <div className="table-container mt-3">
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Arrival Date</th>
                        <th>Members</th>
                        <th>Vehicle Name</th>
                        <th>Guide Number</th>
                        <th>Places</th>
                        <th>Days</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                {filteredBookings.map((booking, index) => (
        <tr key={booking._id}>
            <td>{index+1}</td>
            <td>{booking.name}</td>
            <td>{booking.email}</td>
            <td>{booking.phone}</td>
            <td>{new Date(booking.arrivalDate).toLocaleDateString()}</td>
            <td>{booking.members}</td>
            <td>{booking.vehicleName}</td>
            <td>{booking.guideNumber}</td>
            <td>{booking.places}</td>
            <td>{booking.days}</td>
            <td>
                <BsInfo className="me-2" onClick={() => navigate(`/booking-details/${booking._id}`)} />

            </td>
        </tr>
    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default BookingsAdmin;