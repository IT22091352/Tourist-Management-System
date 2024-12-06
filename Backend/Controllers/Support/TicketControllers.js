const Ticket = require("../../Model/Support/TicketModel");



//RETRIVE
const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find();
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "Tickets not found" });
    }
    return res.status(200).json({ tickets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



//CREATE
const addTickets = async (req, res, next) => {
  const {
    dateCreated,
    subject,
    description,
    touristInfo,
    priority,
    category,
    attachments,
    answer,
  } = req.body;

  try {
    const ticket = new Ticket({
      dateCreated,
      subject,
      description,
      touristInfo,
      priority,
      category,
      attachments,
      answer,
    });
    await ticket.save();
    return res.status(200).json({ ticket });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add ticket" });
  }
};



//FIND BY ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json({ ticket });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



//UPDATE
const updateTicket = async (req, res, next) => {
  const id = req.params.id;
  const {
    dateCreated,
    subject,
    description,
    touristInfo,
    priority,
    category,
    attachments,
    answer,
  } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      {
        dateCreated,
        subject,
        description,
        touristInfo,
        priority,
        category,
        attachments,
        answer,
      },
      { new: true }
    );
    if (!ticket) {
      return res
        .status(404)
        .json({ message: "Unable to update ticket details" });
    }
    return res.status(200).json({ ticket });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//DELETE
const deleteTicket = async (req, res, next) => {
  const id = req.params.id;
  try {
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      return res.status(404).json({ message: "Unable to delete ticket" });
    }
    return res.status(200).json({ ticket });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllTickets,
  addTickets,
  getById,
  updateTicket,
  deleteTicket,
};
