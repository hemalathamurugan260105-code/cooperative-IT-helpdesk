const Ticket = require("../models/Ticket");


// Create Ticket
exports.createTicket = async (req, res) => {

  try {

    const ticket = await Ticket.create({

      title: req.body.title,

      description: req.body.description,

      createdBy: req.user._id

    });

    res.status(201).json(ticket);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// My Tickets
exports.myTickets = async (req, res) => {

  try {

    const tickets = await Ticket.find({
      createdBy: req.user._id
    }).sort({ createdAt: -1 });

    res.json(tickets);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Admin - Get All Tickets
exports.getAllTickets = async (req, res) => {

  try {

    const tickets = await Ticket.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(tickets);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Admin - Update Ticket
exports.updateTicket = async (req, res) => {

  try {

    const { status, priority, resolutionNote } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,

      {
        status,
        priority,
        resolutionNote
      },

      {
        new: true,
        runValidators: true
      }
    ).populate("createdBy", "name email");


    if (!ticket) {

      return res.status(404).json({
        message: "Ticket not found"
      });

    }


    res.json(ticket);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.json(ticket);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// Admin - Delete Ticket
exports.deleteTicket = async (req, res) => {
  try {

    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.json({
      message: "Ticket deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};