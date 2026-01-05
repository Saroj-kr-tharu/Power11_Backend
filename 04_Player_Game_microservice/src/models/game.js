const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['CRICKET', 'FOOTBALL', 'BADMINTON'],
        unique: true,
        required: true,
    },

    maxPlayers: {
        type: Number,
        required: true
    },

    creditLimit: {
        type: Number,
        required: true
    },

    rolesConfig: {
        type: Map,
        of: {
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        },
        required: true
    },


    scoringRules: {
        type: Map,
        of: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },

    rulesVersion: {
        type: Number,
        default: 1
    }

}, { timestamps: true });

const gameModel = mongoose.model('Game', gameSchema);
module.exports = gameModel; 