const {deleteTeam, getTeam, createTeam,getAllTeamsInDB } = require('../controllers/teamController')
const express = require('express');

// alows router functionality
const router = express.Router()

// ======== User Routes ===================
router.route('/')
  .get(getAllTeamsInDB)
  .post(createTeam)

router.route('/:teamID')
  .get(getTeam)
  .delete(deleteTeam)

module.exports = router;