const userCollection = require('../mongooseModels/userModel');
const mongoose = require('mongoose');


const getAllBoards = async (req, res) => {
  const { userID, teamID } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(teamID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {
    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    const foundTeam = foundUser.teams.id(teamID);
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team does not exist inside the user with ID ' + userID });
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
  {
    const { userID, teamID } = req.params;
    const { boardTitle, tickets } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(teamID)) {
      return res.status(400).json({ error: 'Invalid MongoDB ID format' });
    }
  
    try {
      const foundUser = await userCollection.findById(userID);
  
      if (!foundUser) {
        return res.status(404).json({ error: 'User does not exist' });
      }
  
      const foundTeam = foundUser.teams.id(teamID);
      if (!foundTeam) {
        return res.status(404).json({ error: 'Team does not exist inside the user with ID ' + userID });
      }
  
      // Create a new board and add it to the team's boards array
      const newBoard = { boardTitle, tickets: tickets };
      foundTeam.boards.push(newBoard);
      await foundUser.save(); // Save the changes to the user document
  
      // Send the newly created board as a response
      res.status(201).json(newBoard);
  
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the board: ' + error });
    }
  };
}

const getSingleBoard = async (req, res) => {
  // get searched board id from parameters in route
  const { boardID } = req.params;

  //use mongoose function to see if id is valid
  if(!mongoose.Types.ObjectId.isValid(boardID)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'});
  }

  // find board and store in found board
  const foundBoard = await boardCollection.findById(boardID);

  // if found board does not exist
  if (!foundBoard) {
    return res.status(404).json({error: 'Board does not exist'});
  }

  // if everything is successful send board found as json
  res.status(200).json(foundBoard);
}

const updateBoard = async (req, res) => {
  // get id from params
  const { boardID } = req.params;

  //check if valid id
  if(!mongoose.Types.ObjectId.isValid(boardID)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'});
  }

  // find board with id and update 
  const updatedBoard = await boardCollection.findOneAndUpdate({_id: boardID}, {
    ...req.body
  });

  if (!updatedBoard) {
    return res.status(404).json({error: 'Board does not exist'});
  }

  res.status(200).json(updatedBoard);

}

const deleteBoard = async (req, res) => {
  // get id from params
  const { boardID } = req.params;

  //check if valid id
  if(!mongoose.Types.ObjectId.isValid(boardID)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'});
  }

  const BoardDeleted = await boardCollection.findByIdAndDelete({_id: boardID});

  // if failed to delete
  if(!BoardDeleted) {
    res.status(404).json({error: 'Board Does not exist'});
  }

  res.status(200).json(BoardDeleted);
}

module.exports = {
  getAllBoards,
  sendSingleBoard,
  getSingleBoard,
  updateBoard,
  deleteBoard

};