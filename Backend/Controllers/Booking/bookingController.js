const Booking = require('../../Model/Booking/bookingModel');

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bookings.", error: error.message });
    }
}

const addBooking = async (req, res) => {
    const { name, email, phone, arrivalDate, members, vehicleName, guideNumber, places, days } = req.body;

    if (!name || !email || !phone || !arrivalDate || !members || !vehicleName || !guideNumber || !places || !days) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const booking = new Booking({ name, email, phone, arrivalDate, members, vehicleName, guideNumber, places, days });
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: "Failed to add booking.", error: error.message });
    }
}

const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch booking.", error: error.message });
    }
}

const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        res.json({ message: "Booking deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete booking.", error: error.message });
    }
}

const updateBooking = async (req, res) => {
    try {
        const { name, email, phone, arrivalDate, members, vehicleName, guideNumber, places, days } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        booking.name = name;
        booking.email = email;
        booking.phone = phone;
        booking.arrivalDate = arrivalDate;
        booking.members = members;
        booking.vehicleName = vehicleName;
        booking.guideNumber = guideNumber;
        booking.places = places;
        booking.days = days;

        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: "Failed to update booking.", error: error.message });
    }
}

module.exports = {
    getAllBookings,
    addBooking,
    getBooking,
    deleteBooking,
    updateBooking,
};