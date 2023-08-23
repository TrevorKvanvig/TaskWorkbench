const express = require('express');
const requireAuth = require('../middleWare/requireAuth')
// Board controller Functions
const {
  getAllBoards,
  sendSingleBoard,
  updateBoard,
  
} = require('../controllers/boardController');

//Ticket functions
const {
  addTicketToBoard,
  getAllTicketsFromBoard
} = require('../controllers/ticketController');


// alows router functionality
const router = express.Router()
//router.use(requireAuth);
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
  .patch(updateBoard)
//

module.exports = router;