const mongoose = require('mongoose');
const userCollection = require('../mongooseModels/userModel');

const addTicketToBoard = async (req, res) => {
  const { userID, teamID, boardID } = req.params;
  const index = req.query.index;

  const { ticketTitle, ticketDescription, ticketPriority } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userID) ||
      !mongoose.Types.ObjectId.isValid(teamID) ||
      !mongoose.Types.ObjectId.isValid(boardID)) {
    return res.status(404).json({ error: 'Invalid MongoDB Id Format' });
  }

  try {
    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User Does not exist' });
    }

    const foundTeam = foundUser.teams.id(teamID);
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team Does not exist inside of User with id ' + userID });
    }

    const foundBoard = foundTeam.boards.id(boardID);
    if (!foundBoard) {
      return res.status(404).json({ error: 'Board Does not exist inside of Team with id ' + teamID });
    }

    const newTicket = {
      ticketTitle,
      ticketDescription,
      ticketPriority,
      createdAt: new Date(),
    };

    if (!index) {
      // No index specified, push the ticket to the end
      foundBoard.tickets.push(newTicket);
    } else {
      // Index specified, insert the ticket at the specified index
      const parsedIndex = parseInt(index);
      foundBoard.tickets.splice(parsedIndex, 0, newTicket);
    }

    const updatedUser = await foundUser.save();

    // Get the ID of the newly created ticket
    const newTicketID = updatedUser.teams.id(teamID).boards.id(boardID).tickets[updatedUser.teams.id(teamID).boards.id(boardID).tickets.length - 1]._id;

    // Return the newly added ticket with its ID
    res.status(200).json({ ...newTicket, _id: newTicketID });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTicketFromBoard = async (req, res) => {
  const { userID, teamID, boardID, ticketID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID) ||
      !mongoose.Types.ObjectId.isValid(teamID) ||
      !mongoose.Types.ObjectId.isValid(boardID) ||
      !mongoose.Types.ObjectId.isValid(ticketID)) {
    return res.status(404).json({ error: 'Invalid MongoDB Id Format' });
  }

  try {
    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User Does not exist' });
    }

    const foundTeam = foundUser.teams.id(teamID);
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team Does not exist inside of User with id ' + userID });
    }

    const foundBoard = foundTeam.boards.id(boardID);
    if (!foundBoard) {
      return res.status(404).json({ error: 'Board Does not exist inside of Team with id ' + teamID });
    }

    const foundTicket = foundBoard.tickets.id(ticketID);

    if (!foundTicket) {
      return res.status(404).json({ error: 'Ticket Does not exist inside of board with id ' + boardID });
    }

    // Send the found ticket as a response
    res.status(200).json(foundTicket);

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the ticket: ' + error });
  }
};

const deleteTicketFromBoard = async (req, res) => {
  const { userID, teamID, boardID, ticketID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID) ||
      !mongoose.Types.ObjectId.isValid(teamID) ||
      !mongoose.Types.ObjectId.isValid(boardID) ||
      !mongoose.Types.ObjectId.isValid(ticketID)) {
    return res.status(404).json({ error: 'Invalid MongoDB Id Format' });
  }

  try {
    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User Does not exist' });
    }

    const foundTeam = foundUser.teams.id(teamID);
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team Does not exist inside of User with id ' + userID });
    }

    const foundBoard = foundTeam.boards.id(boardID);
    if (!foundBoard) {
      return res.status(404).json({ error: 'Board Does not exist inside of Team with id ' + teamID });
    }

    const foundTicket = foundBoard.tickets.id(ticketID);
    if (!foundTicket) {
      return res.status(404).json({ error: 'Ticket Does not exist inside of board with id ' + boardID });
    }

    // Find the index of the ticket within the board's tickets array
    const ticketIndex = foundBoard.tickets.findIndex(ticket => ticket._id.equals(ticketID));
    // If the ticket does not exist
    if (ticketIndex === -1) {
      return res.status(404).json({ error: 'Ticket Does Not Exist' });
    }

    // Remove the ticket from the tickets array using splice
    foundBoard.tickets.splice(ticketIndex, 1);
    // Save the updated user to the database
    await foundUser.save();

    // If everything is successful, send a success response
    res.status(200).json({ message: 'Ticket deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the ticket: ' + error });
  }
};

const updateTicketFromBoard = async (req, res) => {
  const { userID, teamID, boardID, ticketID } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userID) ||
        !mongoose.Types.ObjectId.isValid(teamID) ||
        !mongoose.Types.ObjectId.isValid(boardID) ||
        !mongoose.Types.ObjectId.isValid(ticketID)) {
      return res.status(404).json({ error: 'Invalid MongoDB Id Format' });
    }

    const foundUser = await userCollection.findById(userID);

    if (!foundUser) {
      return res.status(404).json({ error: 'User Does not exist' });
    }

    const foundTeam = foundUser.teams.id(teamID);
    if (!foundTeam) {
      return res.status(404).json({ error: 'Team Does not exist inside of User with id ' + userID });
    }

    const foundBoard = foundTeam.boards.id(boardID);
    if (!foundBoard) {
      return res.status(404).json({ error: 'Board Does not exist inside of Team with id ' + teamID });
    }

    const foundTicket = foundBoard.tickets.id(ticketID);

    if (!foundTicket) {
      return res.status(404).json({ error: 'Ticket Does not exist inside of board with id ' + boardID });
    }

    // Update the ticket with the provided request body
    foundTicket.set({ ...req.body });

    // Save the updated user to the database
    await foundUser.save();

    // Send a success response
    res.status(200).json({ message: 'UpdateTicket Successful', foundTicket });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the ticket: ' + error });
  }
};



module.exports = {
  addTicketToBoard,
  getTicketFromBoard,
  deleteTicketFromBoard,
  updateTicketFromBoard,
}