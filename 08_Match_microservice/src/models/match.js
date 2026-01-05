const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
      index: true
    },

    title: {
      type: String,
      required: true
    },

    matchType: {
      type: String,
      enum: ["TEAM", "INDIVIDUAL"],
      default: "TEAM"
    },

    teams: [
      {
        teamId: String,   // "IND", "AUS", "MU"
        name: String,
        shortName: String,
        logo: String
      }
    ],

    venue: {
      type: String
    },

    startTime: {
      type: Date,
      required: true,
      index: true
    },

    endTime: {
      type: Date
    },

    status: {
      type: String,
      enum: ["UPCOMING", "LIVE", "COMPLETED", "CANCELLED"],
      default: "UPCOMING",
      index: true
    },

    squadAnnounced: {
      type: Boolean,
      default: false
    },

    result: {
    winnerTeamId: String,
    isDraw: Boolean,
    summary: String,
    winMargin: String
  },


    metadata: {
      type: Map,
      of: String
    },

    createdBy: {
      type: String 
    }
  },
  { timestamps: true }
);


MatchSchema.index({ gameId: 1, startTime: 1 });
MatchSchema.index({ status: 1, startTime: 1 });


const matchModel = mongoose.model('Match', MatchSchema);
module.exports = matchModel; 
