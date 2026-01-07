const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },

    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
      index: true
    },

    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
      index: true
    },

    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
      index: true
    },

    players: [
      {
        matchPlayerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MatchPlayer",
          required: true
        },
        playerSnapshot: {
          playerId: { type: mongoose.Schema.Types.ObjectId },
          name: { type: String },
          teamName: { type: String },
          image: { type: String },
          roles: [{ type: String }]
        },
        role: {
          type: String,
          required: true
        },
        credits: {
          type: Number,
          required: true
        },
        isCaptain: {
          type: Boolean,
          default: false
        },
        isViceCaptain: {
          type: Boolean,
          default: false
        }
      }
    ],

    totalCredits: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

TeamSchema.index(
  { userId: 1, contestId: 1, matchId: 1 },
  { unique: true }
);

const teamModel = mongoose.model('Team', TeamSchema);
module.exports = teamModel;