const boardCollection = require('../mongooseModels/boardModel');
const mongoose = require('mongoose');


const getAllBoards = async (req, res) => {
  // get boards from database
  const allBoards = await boardCollection.find({});
  
  // send boards as json data
  res.status(200).json(allBoards);
}

const sendSingleBoard = async (req, res) => {
  const {boardTitle, tickets} = req.body;
  
  try {// this is async so to make function wait till this is completed use await and async
    const boardCreated = await boardCollection
      .create({
        boardTitle,
        tickets
      });

    // send created board to user as conformation
    res.status(200).json(boardCreated);

  } catch (error) {
    res.status(400).json({error: error.message});
  }
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