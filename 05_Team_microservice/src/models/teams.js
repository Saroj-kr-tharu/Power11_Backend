const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({

    userId: {
        type: String,
        index: true,
        required: true
    },


    players: [
        {
            matchPlayerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MatchPlayer",
                required: true
            },
            role: String,
            credits: Number,
            isCaptain: Boolean,
            isViceCaptain: Boolean
        }
    ],


    contestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contest',
        required: true
    },

    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game',
        required: true
    },

    totalCredits: {
        type: Number,
        required: true
    }

   
}, { timestamps: true });



TeamSchema.index(
  { userId: 1, contestId: 1, gameId: 1 },
  { unique: true }
);


TeamSchema.index({ contestId: 1 });
TeamSchema.index({ gameId: 1 });

const teamModel = mongoose.model('Team', TeamSchema);
module.exports = teamModel; 