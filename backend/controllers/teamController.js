const userCollection = require('../mongooseModels/userModel.js');
const mongoose = require('mongoose');


const addTeamToUser = async (req, res) => {
  const { userID } = req.params;

  const { teamTitle } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).json({ error: 'Not MongoDB Id Format' });
  }

  try {
    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User Does not exist' });
    }

    const newTeam = {
      teamTitle
    };
  
    
    foundUser.teams.push(newTeam);
    await foundUser.save();
    // Return the newly added ticket with its ID
    res.status(200).json(newTeam);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  const { userID, teamID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(teamID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {
    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    foundUser.teams.pull({ _id: teamID }); // Remove the team from the user's teams array
    await foundUser.save();   // Save the changes to the user document

    // Send a success response
    res.status(200).json({ message: 'Team deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the team: ' + error });
  }
};



module.exports = {
  addTeamToUser,
  deleteTeam
}