const userCollection = require('../mongooseModels/userModel.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const createToken = (id) => {
  return jwt.sign({_id: id}, process.env.SECRET, {expiresIn: '3d'} )
}

const getAllUsers = async (req, res) => {
  // get boards from database
  const allBoards = await userCollection.find({});

  // send boards as json data
  res.status(200).json(allBoards);
}

const addUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {

    // calls statc function in userModel.js
    // this is async so to make function wait till this is completed use await and async
    const userCreated = await userCollection.signup(username, email, password);
    

    const token = createToken(userCreated._id);
    const username = userCreated.username;
    res.status(200).json({email, username, token});

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {

    // calls statc function in userModel.js
    const user = await userCollection.login(email, password);


    const token = createToken(user._id);
    const username = user.username
    res.status(200).json({ email, username, token});

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getSingleUser = async (req, res) => {
  // get searched board id from parameters in route
  const { userID } = req.params;

  //use mongoose function to see if id is valid
  if (!mongoose.Types.ObjectId.isValid(userID)) { // if not valid mongo ID
    return res.status(404).json({ error: 'Not MongoDB Id Fromat' });
  }

  // find board and store in found board
  const foundUser = await userCollection.findById(userID);

  // if found board does not exist
  if (!foundUser) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  // if everything is successful send board found as json
  res.status(200).json(foundUser);
}

const deleteUser = async (req, res) => {
  // get id from params
  const { userID } = req.params;

  //check if valid id
  if (!mongoose.Types.ObjectId.isValid(userID)) { // if not valid mongo ID
    return res.status(404).json({ error: 'Not MongoDB Id Fromat' });
  }

  try {
    const UserDeleted = await userCollection.findByIdAndDelete({ _id: userID });

    // if failed to delete
    if (!UserDeleted) {
      return res.status(404).json({ error: 'User Does not exist' }); // Add 'return' here
    }

    return res.status(200).json(UserDeleted);
  } catch (error) {
    return res.status(500).json({ error: 'Error occurred when trying to Delete User' + error });
  }

}

const updateUserInfo = async (req, res) => {
  const updatedUser = req.body
  const { userID } = req.params

  if (!mongoose.Types.ObjectId.isValid(userID)) { // if not valid mongo ID
    return res.status(404).json({ error: 'Not MongoDB Id Fromat' });
  }
  try {
    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User Does not exist' })
    }

    // Update the board data with the updatedBoardData
    foundUser.set({...updatedUser})
    await foundUser.save(); // Save the changes to the user document

    // Send a success response
    res.status(200).json({ message: 'User updated successfully', updatedUser: foundUser });

  } catch (error) {
    return res.status(500).json({ error: 'Error Updating user in Database' + error })
  }
}


module.exports = {
  getAllUsers,
  addUser,
  getSingleUser,
  deleteUser,
  updateUserInfo,
  loginUser
}