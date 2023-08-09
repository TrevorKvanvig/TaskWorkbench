const express = require('express');

// Board controller Functions
const {
  getAllBoards,
  sendSingleBoard,
  
} = require('../controllers/boardController');

//Ticket functions
const {
  getTicketFromBoard,
  addTicketToBoard,
  deleteTicketFromBoard,
  updateTicketFromBoard,
  getAllTicketsFromBoard
} = require('../controllers/ticketController');


// alows router functionality
const router = express.Router()

// ======== General ===================
router.route('/:teamID')
  // return all boards in database
  .get(getAllBoards)
  
  // add a board to database
  .post(sendSingleBoard)
//


// ======== When ID is Searched =======
router.route('/:teamID/:boardID')
  .get(getAllTicketsFromBoard)
  //add ticket to board
  .post(addTicketToBoard)
//

module.exports = router;