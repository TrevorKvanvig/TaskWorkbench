const userCollection = require('../mongooseModels/userModel.js');
const teamCollection = require('../mongooseModels/teamModel.js');
const requireAuth = require('../middleWare/requireAuth.js');
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

    const newTeam = await teamCollection
      .create({
        teamTitle,
        teamOwner: foundUser._id
      });

    foundUser.team_ids.push(newTeam._id);
    await foundUser.save();
    // send created board to team as conformation
    res.status(200).json(newTeam);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addTeamIdToUser = async (req, res) => {
  const { userID, teamID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(teamID)) {
    return res.status(404).json({ error: 'Not MongoDB Id Format' });
  }

  try {
    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User Does not exist' });
    }
    const foundTeam = await teamCollection.findById(teamID);
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team Does not exist' });
    }

    // Check if the teamID is already in the user's team_ids array
    if (!foundUser.team_ids.includes(foundTeam._id)) {
      foundUser.team_ids.push(foundTeam._id);
      await foundUser.save();
    }

    // send updated user document as confirmation
    res.status(200).json(foundUser);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const deleteTeam = async (req, res) => {
  const { teamID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teamID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {
    // delete team
    const teamDeleted = await teamCollection.deleteOne({ _id: teamID });
    
    // if deleted count is 0 that means team does not exist
    if (teamDeleted.deletedCount === 0) {
      return res.status(404).json({ error: 'Team Does not exist' });
    }

    // Update users to remove the team's ID from their team_ids array
    await userCollection.updateMany({ team_ids: teamID }, { $pull: { team_ids: teamID } });

    res.status(200).json({ message: 'Team deleted successfully', teamID: teamID });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the team: ' + error });
  }
};




const deleteTeamInUser = async (req, res) => {
  const { userID, teamID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(teamID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {
    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    const updatedTeams = foundUser.team_ids.filter(team => team._id.toString() !== teamID);
    foundUser.team_ids = updatedTeams; // Remove the team from the user's teams array
    await foundUser.save();   // Save the changes to the user document

    // Send a success response
    res.status(200).json({ message: 'Team deleted successfully in Users teamIds array' });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the team: ' + error });
  }
};

const updateTeamTitle = async (req, res) => {
  const { teamID } = req.params;

  try {
    //use mongoose function to see if id is valid
    if ( !mongoose.Types.ObjectId.isValid(teamID)) { // if not valid mongo ID
      return res.status(404).json({ error: 'Not MongoDB Id Fromat' });
    }

    const foundTeam = await teamCollection.findById(teamID);

    if (!foundTeam) {
      return res.status(404).json({ error: 'Team Does not exist'});
    }

    foundTeam.set({ ...req.body });

    // Save the updated board to the database
    await foundTeam.save();

    // if everything is successful send board found as json
    res.status(200).json({ mssg: 'UpdateTicket Sucessful', foundTeam });
  } catch (error) {
    res.status(500).json({ error: 'Cant update' + error })
  }

} 

const getTeam = async (req, res) => {
  const { teamID } = req.params;

  //use mongoose function to see if id is valid
  if (!mongoose.Types.ObjectId.isValid(teamID)) { // if not valid mongo ID
    return res.status(404).json({ error: 'Not MongoDB Id Fromat' });
  }

  const foundTeam = await teamCollection.findById(teamID);

  if (!foundTeam) {
    return res.status(404).json({ error: 'Team Does Not Exist' });
  }

  // if everything is successful send board found as json
  res.status(200).json(foundTeam);

}

const createTeam = async (req, res) => {
  const {teamTitle} = req.body

  try{
    const teamCreated = await teamCollection.create({teamTitle})

    res.status(200).json(teamCreated)
  }catch(error){
    return res.status(500).json({error: 'Unable To Create Team' + error})
  }

}

const getAllTeamsInDB = async (req, res) => {
  try {
    const allTeams = await teamCollection.find({});
    res.status(200).json(allTeams)
  }catch(error) {
    res.status(500).json({error: 'unable to retrieve teams' + error})
  }
}



module.exports = {
  addTeamToUser,
  deleteTeam,
  updateTeamTitle,
  getTeam,
  addTeamIdToUser,
  deleteTeamInUser,
  createTeam,
  getAllTeamsInDB
}