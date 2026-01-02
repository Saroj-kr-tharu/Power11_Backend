const mongoose = require('mongoose');

const matchPlayerSchema = new mongoose.Schema({
   matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
    index: true
  },

  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
    index: true
  },

  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },

  credits: {
    type: Number,
    required: true
  },

  roles: {
    type: [String],
    validate: v => v.length > 0
  },


  isPlaying: {
    type: Boolean,
    default: false
  },

  playingStatus: {
    type: String,
    enum: ['ANNOUNCED', 'UNANNOUNCED', 'BENCH'],
    default: 'UNANNOUNCED'
  },

  points: {
    type: Number,
    default: 0
  },

  isActive: {
    type: Boolean,
    default: true
  }

   

}, { timestamps: true });

matchPlayerSchema.index({ matchId: 1, playerId: 1 }, { unique: true });

const matchPlayerModel = mongoose.model('MatchPlayer', matchPlayerSchema);
module.exports = matchPlayerModel; 