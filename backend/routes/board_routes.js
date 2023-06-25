const express = require('express');
const {
  getAllBoards,
  sendSingleBoard,
  getSingleBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boardController');

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
//

// router.route('/:boardID/:ticketID')
//   .get(getTicket)





// allow routes to be used in other files
module.exports = router;