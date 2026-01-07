
const mongoose = require("mongoose");

const UserContestSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // from auth service
      required: true,
      index: true
    },

    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
      index: true
    },

    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
      index: true
    },

    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
      index: true
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team", // fantasy team created by user
      required: true
    },

    joinFee: {
      type: Number,
      required: true
    },

    joinedAt: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ["JOINED", "CANCELLED", "REFUNDED"],
      default: "JOINED",
      index: true
    },

    rank: {
      type: Number
    },

    winnings: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

/* Prevent duplicate join */
UserContestSchema.index(
  { userId: 1, contestId: 1 },
  { unique: true }
);

const userContestModel =  mongoose.model("UserContest", UserContestSchema);
module.exports = userContestModel; 


