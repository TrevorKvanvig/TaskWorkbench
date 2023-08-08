const ticketSchema = require('./ticketModel');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    boardTitle: {
      type: String,
      required: true,
    },
    tickets: [ticketSchema],
  },
  { timestamps: true }
);

//export Boards collection to be used in other files using the BoardSchema declared
module.exports = boardSchema;