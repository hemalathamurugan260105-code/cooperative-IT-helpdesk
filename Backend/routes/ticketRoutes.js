const express=require("express");

const router=express.Router();


const {
createTicket,
myTickets,
getAllTickets,
  updateTicket,
  getTicketById,
    deleteTicket
}=require("../controllers/ticketController");


const {
protect
}=require("../middleware/authMiddleware");


// USER - Create Ticket
router.post(
"/",
protect,
createTicket
);

// USER - My Tickets

router.get(
"/my",
protect,
myTickets
);
// ADMIN - View All Tickets
router.get(
  "/all",
  protect,
  getAllTickets
);

// ADMIN - Update Ticket
router.put(
  "/:id",
  protect,
  updateTicket
);
router.get(
  "/:id",
  protect,
  getTicketById
);
// ADMIN - Delete Ticket
router.delete(
  "/:id",
  protect,
  deleteTicket
);



module.exports=router;