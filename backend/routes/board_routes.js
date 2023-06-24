const express = require('express');
const {
  getAllBoards,
  sendSingleBoard
} = require('../controllers/boardController');

// alows router functionality
const router = express.Router()

router.route('/')
  // return all boards in database
  .get(getAllBoards)
  // add a board to database
  .post(sendSingleBoard)

router.route('/:boardID')
  // return board with specified id
  .get((req, res) => {
    
    res.send("Router hi");
  })
  // delete board from database with id specified
  .delete((req, res) => {
    
  })
  // update board in database with id specified
  .patch((req, res) => {
    
  })

// allow routes to be used in other files
module.exports = router;