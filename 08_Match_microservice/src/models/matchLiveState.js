const mongoose = require("mongoose");

const MatchLiveStateSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      unique: true,
      index: true
    },

    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      index: true
    },

    progress: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true
    },

    lastEventAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MatchLiveState", MatchLiveStateSchema);
