const mongoose = require('mongoose');
const boardCollection = require('../mongoose_models/board_model');

const addTicketToBoard = async (req, res) => {
  const { boardID } = req.params;
  const { ticketTitle, ticketDescription, ticketPriority } = req.body;

  //use mongoose function to see if id is valid
  if(!mongoose.Types.ObjectId.isValid(boardID)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'});
  }

  // find board and store in found board
  const foundBoard = await boardCollection.findById(boardID);

  // if found board does not exist
  if (!foundBoard) {
    return res.status(404).json({error: 'Board Does not exist'});
  }

  try {

    const newTicket = {
      ticketTitle,
      ticketDescription,
      ticketPriority
    };

    foundBoard.tickets.push(newTicket);

    updatedBoard = await foundBoard.save()

    // if everything is successful send board found as json
    res.status(200).json(updatedBoard);

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getTicketFromBoard = async (req, res) => {
  const { boardID, ticketID } = req.params;

  //use mongoose function to see if id is valid
  if(!mongoose.Types.ObjectId.isValid(boardID) || !mongoose.Types.ObjectId.isValid(ticketID)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'});
  }

  // find board and store in found board
  const foundBoard = await boardCollection.findById(boardID);

  // if found board does not exist
  if (!foundBoard) {
    return res.status(404).json({error: 'Board Does not exist'});
  }

  const foundTicket = foundBoard.tickets.id(ticketID);

  if (!foundTicket) {
    return res.status(404).json({error: 'Ticket Does not exist inside of board with id ' + boardID});
  }

  // if everything is successful send board found as json
  res.status(200).json(foundTicket);

}

const deleteTicketFromBoard = async (req, res) => {
  const { boardID, ticketID } = req.params;

  //use mongoose function to see if id is valid
  if(!mongoose.Types.ObjectId.isValid(boardID) || !mongoose.Types.ObjectId.isValid(ticketID)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'});
  }

  // find board and store in found board
  const foundBoard = await boardCollection.findById(boardID);
  // if found board does not exist
  if (!foundBoard) {
    return res.status(404).json({error: 'Board Does not exist'});
  }

  const foundTicket = foundBoard.tickets.id(ticketID);
  if (!foundTicket) {
    return res.status(404).json({error: 'Ticket Does not exist inside of board with id ' + boardID});
  }

  // Find the index of the ticket within the board's tickets array
  const ticketIndex = foundBoard.tickets.findIndex(ticket => ticket._id.equals(ticketID));
  // If the ticket does not exist
  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket Does Not Exist' });
  }

  // Remove the ticket from the tickets array using splice
  foundBoard.tickets.splice(ticketIndex, 1);
  // Save the updated board to the database
  await foundBoard.save();

  // If everything is successful, send a success response
  res.status(200).json({ message: 'Ticket deleted successfully', foundTicket });

}

const updateTicketFromBoard = async (req, res) => {
  const { boardID, ticketID } = req.params;

  //use mongoose function to see if id is valid
  if(!mongoose.Types.ObjectId.isValid(boardID) || !mongoose.Types.ObjectId.isValid(ticketID)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'});
  }

  // find board and store in found board
  const foundBoard = await boardCollection.findById(boardID);

  // if found board does not exist
  if (!foundBoard) {
    return res.status(404).json({error: 'Board Does not exist'});
  }

  const foundTicket = foundBoard.tickets.id(ticketID);

  if (!foundTicket) {
    return res.status(404).json({error: 'Ticket Does not exist inside of board with id ' + boardID});
  }


  foundTicket.set({ ...req.body });

  // Save the updated board to the database
  await foundBoard.save();



  // if everything is successful send board found as json
  res.status(200).json( {mssg: 'UpdateTicket Sucessful', foundTicket});
}


module.exports = {
  addTicketToBoard,
  getTicketFromBoard,
  deleteTicketFromBoard,
  updateTicketFromBoard
}