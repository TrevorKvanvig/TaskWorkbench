const {getAllUsers, addUser, getSingleUser, deleteUser, updateUserInfo, loginUser} = require('../controllers/userController');
const {addTeamToUser, deleteTeamInUser, addTeamIdToUser} = require('../controllers/teamController');
const requireAuth = require('../middleWare/requireAuth.js');
const express = require('express');

// alows router functionality
const router = express.Router()
// ======== User Routes ===================
router.route('/')
  // return all boards in database
  .get(getAllUsers)//
  
  // add a board to database
  .post(addUser)
//
router.route('/login')
  .post(loginUser)
  
router.route('/:userID')
  .get(getSingleUser)
  .delete(deleteUser)
  .post(addTeamToUser)
  .patch(updateUserInfo)

router.route('/:userID/:teamID')
  .delete(deleteTeamInUser)
  .post(addTeamIdToUser)

module.exports = router;