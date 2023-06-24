const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    ticketTitle: {
      type: String,
      required: true,
    },
    ticketDescription: {
      type: String,
      required: true,
    },
    ticketPriority: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

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
module.exports = mongoose.model('Board', boardSchema);