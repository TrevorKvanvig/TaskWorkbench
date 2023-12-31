const userCollection = require('../mongooseModels/userModel');
const teamColletion = require('../mongooseModels/teamModel');
const boardCollection = require('../mongooseModels/boardModel');
const mongoose = require('mongoose');


const getAllBoards = async (req, res) => {
  const { teamID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teamID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {

    const foundTeam = await teamColletion.findById(teamID)
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team does not exist ' });
    }

    // Retrieve all boards from the found team
    const teamBoards = foundTeam.boards;

    // Send the array of team boards as a response
    res.status(200).json(teamBoards);

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching team boards: ' + error });
  }
}

const sendSingleBoard = async (req, res) => {
  const { teamID } = req.params;
  const { boardTitle } = req.body;
  let emptyFeilds = [];
  if (!boardTitle){
    emptyFeilds.push('Title')
  }

  if (!mongoose.Types.ObjectId.isValid(teamID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {
    const foundTeam = await teamColletion.findById(teamID);
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team does not exist' });
    }

    // Create a new board
    const newBoard = {
      boardTitle,
      tickets: []
    };

    // Add the new board to the team's boards array
    foundTeam.boards.push(newBoard);
    await foundTeam.save(); // Save the changes 

    // Fetch the newly created board with complete details from the database
    const createdBoard = foundTeam.boards[foundTeam.boards.length - 1];

    // Send the newly created board with all its details as a response
    res.status(201).json(createdBoard);

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the board: ' + error, emptyFeilds });
  }
};


const getSingleBoard = async (req, res) => {
  const { teamID, boardID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teamID) ||
    !mongoose.Types.ObjectId.isValid(boardID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {

    const foundTeam = await teamColletion.findById(teamID)
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team does not exist' });
    }

    const foundBoard = foundTeam.boards.id(boardID);
    if (!foundBoard) {
      return res.status(404).json({ error: 'Board does not exist inside the team with ID ' + teamID });
    }

    // Send the found board as a response
    res.status(200).json(foundBoard);

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the board: ' + error });
  }
};

const updateBoard = async (req, res) => {
  const { teamID, boardID } = req.params;
  const updatedBoardData = req.body; // Make sure to send the updated data in the request body

  if (!mongoose.Types.ObjectId.isValid(teamID) ||
    !mongoose.Types.ObjectId.isValid(boardID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {

    const foundTeam = await teamColletion.findById(teamID);
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team does not exist' });
    }

    const foundBoard = foundTeam.boards.id(boardID);
    if (!foundBoard) {
      return res.status(404).json({ error: 'Board does not exist inside the team with ID ' + teamID });
    }

    // Update the board data with the updatedBoardData
    Object.assign(foundBoard, updatedBoardData);
    await foundTeam.save(); // Save the changes to the user document

    // Send a success response
    res.status(200).json({ message: 'Board updated successfully', updatedBoard: foundBoard });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the board: ' + error });
  }
};

const deleteBoard = async (req, res) => {
  const { userID, teamID, boardID } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(teamID) ||
    !mongoose.Types.ObjectId.isValid(boardID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {

    const foundTeam = await teamColletion.findById(teamID);
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team does not exist' });
    }

    const foundBoard = foundTeam.boards.id(boardID);
    if (!foundBoard) {
      return res.status(404).json({ error: 'Board does not exist inside the team with ID ' + teamID });
    }

    foundTeam.boards.pull(boardID);  // Remove the board from the team's boards array
    await foundTeam.save(); // Save the changes to the user document

    // Send a success response
    res.status(200).json({ message: 'Board deleted successfully', _id: boardID });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the board: ' + error });
  }
};

module.exports = {
  getAllBoards,
  sendSingleBoard,
  getSingleBoard,
  updateBoard,
  deleteBoard

};