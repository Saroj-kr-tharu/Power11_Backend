const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
      index: true
    },

    entryFee: {
      type: Number,
      required: true,
      min: 0
    },

    prizePool: {
      type: Number,
      required: true,
      min: 0
    },

    maxParticipants: {
      type: Number,
      required: true
    },

    joinedParticipants: {
      type: Number,
      default: 0
    },

    startTime: {
      type: Date,
      required: true
    },

    endTime: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["SCHEDULED", "LIVE", "COMPLETED", "CANCELLED"],
      default: "SCHEDULED"
    },

    isFull: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


ContestSchema.index({ gameId: 1, status: 1 });
ContestSchema.index({ startTime: 1 });


const contestModel = mongoose.model('Contest', ContestSchema);
module.exports = contestModel; 
