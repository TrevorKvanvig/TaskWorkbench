const userCollection = require('../mongooseModels/userModel.js');
const teamCollection = require('../mongooseModels/teamModel.js')
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
        teamTitle
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
    foundUser.team_ids.push(foundTeam._id);
    await foundUser.save();
    // send created board to team as conformation
    res.status(200).json(foundUser);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const deleteTeam = async (req, res) => {
  const {teamID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teamID)) {
    return res.status(400).json({ error: 'Invalid MongoDB ID format' });
  }

  try {
    const teamDeleted = await teamCollection.findByIdAndDelete({_id: teamID});

    // if failed to delete
    if(!teamDeleted) {
      res.status(404).json({error: 'Team Does not exist'});
    }
  
    res.status(200).json(teamDeleted);

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
  const { userID, teamID } = req.params;

  try {
    //use mongoose function to see if id is valid
    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(teamID)) { // if not valid mongo ID
      return res.status(404).json({ error: 'Not MongoDB Id Fromat' });
    }

    // find board and store in found board
    const foundUser = await userCollection.findById(userID);

    // if found board does not exist
    if (!foundUser) {
      return res.status(404).json({ error: 'User Does not exist' });
    }

    const foundTeam = foundUser.teams.id(teamID);

    if (!foundTeam) {
      return res.status(404).json({ error: 'Ticket Does not exist inside of board with id ' + userID });
    }


    foundTeam.set({ ...req.body });

    // Save the updated board to the database
    await foundUser.save();

    // if everything is successful send board found as json
    res.status(200).json({ mssg: 'UpdateTicket Sucessful', foundTeam });
  } catch (error) {
    res.status(500).json({ error: 'Cant update' })
  }

} 

const getTeam = async (req, res) => {
  const { userID, teamID } = req.params;

  //use mongoose function to see if id is valid
  if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(teamID)) { // if not valid mongo ID
    return res.status(404).json({ error: 'Not MongoDB Id Fromat' });
  }

  // find board and store in found board
  const foundUser = await userCollection.findById(userID);

  // if found board does not exist
  if (!foundUser) {
    return res.status(404).json({ error: 'User Does not exist' });
  }

  const foundTeam = foundUser.teams.id(teamID);

  if (!foundTeam) {
    return res.status(404).json({ error: 'Ticket Does not exist inside of board with id ' + userID });
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