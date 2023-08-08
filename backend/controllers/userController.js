const userCollection = require('../mongooseModels/userModel.js');
const mongoose = require('mongoose');


const getAllUsers = async (req, res) => {
  // get boards from database
  const allBoards = await userCollection.find({});
  
  // send boards as json data
  res.status(200).json(allBoards);
}

const addUser =  async (req, res) => {
  const {email, password} = req.body;
  
  try {// this is async so to make function wait till this is completed use await and async
    const userCreated = await userCollection
      .create({
        email,
        password
      });

    // send created board to user as conformation
    res.status(200).json(userCreated);

  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  getAllUsers,
  addUser
}