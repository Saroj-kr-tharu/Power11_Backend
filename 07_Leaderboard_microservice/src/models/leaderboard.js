const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({

   contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
      index: true
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    userId: {
      type: String, 
      required: true,
      index: true
    },

   totalPoints: {
        type: Number,
        default: 0
    },

    rank: {
      type: Number
    }


    
   
}, { timestamps: true });

/* Prevent duplicates */
LeaderboardSchema.index(  { contestId: 1, teamId: 1 }, { unique: true } );

/* Fast leaderboard sorting */
LeaderboardSchema.index({ contestId: 1, totalPoints: -1 });



const leaderboardModel = mongoose.model('Leaderboard', LeaderboardSchema);
module.exports = leaderboardModel; 