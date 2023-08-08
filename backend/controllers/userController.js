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

const getSingleUser = async (req, res) => {
  // get searched board id from parameters in route
  const { userID } = req.params;

  //use mongoose function to see if id is valid
  if(!mongoose.Types.ObjectId.isValid(userID)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'});
  }

  // find board and store in found board
  const foundUser = await userCollection.findById(userID);

  // if found board does not exist
  if (!foundUser) {
    return res.status(404).json({error: 'User does not exist'});
  }

  // if everything is successful send board found as json
  res.status(200).json(foundUser);
}

const deleteUser = async (req, res) => {
  // get id from params
  const { userID } = req.params;

  //check if valid id
  if(!mongoose.Types.ObjectId.isValid(userID)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'});
  }

  const UserDeleted = await userCollection.findByIdAndDelete({_id: userID});

  // if failed to delete
  if(!UserDeleted) {
    res.status(404).json({error: 'User Does not exist'});
  }

  res.status(200).json(UserDeleted);
}

module.exports = {
  getAllUsers,
  addUser,
  getSingleUser,
  deleteUser
}