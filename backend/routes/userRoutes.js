const {getAllUsers, addUser, getSingleUser, deleteUser} = require('../controllers/userController')
const {addTeamToUser, deleteTeam, updateTeamTitle, getTeam} = require('../controllers/teamController')
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

router.route('/:userID')
  .get(getSingleUser)
  .delete(deleteUser)
  .post(addTeamToUser)

router.route('/:userID/:teamID')
.delete(deleteTeam)
.patch(updateTeamTitle)
.get(getTeam)
module.exports = router;