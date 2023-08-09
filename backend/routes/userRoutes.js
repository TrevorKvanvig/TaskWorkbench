const {getAllUsers, addUser, getSingleUser, deleteUser, updateUserInfo} = require('../controllers/userController')
const {addTeamToUser, deleteTeamInUser, updateTeamTitle, getTeam,addTeamIdToUser} = require('../controllers/teamController')
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

router.route('/:userID')
  .get(getSingleUser)
  .delete(deleteUser)
  .post(addTeamToUser)
  .patch(updateUserInfo)

router.route('/:userID/:teamID')
  .delete(deleteTeamInUser)
  .post(addTeamIdToUser)

module.exports = router;