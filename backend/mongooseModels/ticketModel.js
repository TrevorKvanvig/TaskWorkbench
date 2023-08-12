const mongoose = require('mongoose')
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

module.exports = ticketSchema