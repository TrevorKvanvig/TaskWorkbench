const express = require('express');

// Board controller Functions
const {
  getAllBoards,
  sendSingleBoard,
  getSingleBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boardController');

//Ticket functions
const {
  getTicketFromBoard,
  addTicketToBoard,
  deleteTicketFromBoard,
  updateTicketFromBoard
} = require('../controllers/ticketController');


// alows router functionality
const router = express.Router()

// ======== General ===================
router.route('/')
  // return all boards in database
  .get(getAllBoards)
  
  // add a board to database
  .post(sendSingleBoard)
//


// ======== When ID is Searched =======
router.route('/:boardID')
  // return board with specified id
  .get(getSingleBoard)

  // delete board from database with id specified
  .delete(deleteBoard)

  // update board in database with id specified
  .patch(updateBoard)

  //add ticket to board
  .post(addTicketToBoard)
//

router.route('/:boardID/:ticketID')
  //get a single ticket from board
  .get(getTicketFromBoard)
  
  //delete a single ticket from board
  .delete(deleteTicketFromBoard)

  //update a single ticket from board
  .patch(updateTicketFromBoard)
// allow routes to be used in other files
module.exports = router;