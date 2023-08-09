const { deleteTeam, getTeam, createTeam, getAllTeamsInDB, updateTeamTitle } = require('../controllers/teamController')
const { getSingleBoard, deleteBoard, updateBoard } = require('../controllers/boardController')
const { getTicketFromBoard, updateTicketFromBoard, deleteTicketFromBoard } = require('../controllers/ticketController')
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
  .patch(updateTeamTitle)

router.route('/:teamID/:boardID')
  .get(getSingleBoard)
  .delete(deleteBoard)
  .patch(updateBoard)

router.route('/:teamID/:boardID/:ticketID')
  .get(getTicketFromBoard)
  .patch(updateTicketFromBoard)
  .delete(deleteTicketFromBoard)
module.exports = router;