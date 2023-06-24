const boardCollection = require('../mongoose_models/board_model');

const getAllBoards = async (req, res) => {
  // get boards from database
  const allBoards = await boardCollection.find({}).sort({createdAt: 1});
  
  // send boards as json data
  res.status(200).json(allBoards)
}

const sendSingleBoard = async (req, res) => {
  const {boardTitle, tickets} = req.body;
  
  try {
    const boardCreated = await boardCollection// this is async so to make function wait till this is completed use await and async
      .create({
        boardTitle,
        tickets
      }) 
      // send created board to user as conformation
    res.status(200).json(boardCreated)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = {
  getAllBoards,
  sendSingleBoard
}