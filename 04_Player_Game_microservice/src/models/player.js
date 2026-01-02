const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game',
        required: true
    },

    roles: {
        type: [String],
        required: true
    },

    team: {
        type: String,
        required: true
    },

    baseCredits: {
        type: Number,
        required: true
    }

   

}, { timestamps: true });

const playerModel = mongoose.model('Player', playerSchema);
module.exports = playerModel; 