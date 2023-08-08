const {getAllUsers, addUser} = require('../controllers/userController')
const express = require('express');

// alows router functionality
const router = express.Router()

// ======== User Routes ===================
router.route('/')
  // return all boards in database
  .get(getAllUsers)
  
  // add a board to database
  .post(addUser)
//

module.exports = router;