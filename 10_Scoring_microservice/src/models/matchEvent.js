const mongoose = require('mongoose');

const matchEventSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
      required: true,
      index: true
    },

    gameId: {
      type: String,
      required: true,
      index: true
    },

    contestId: { 
        type: String,
        required: true,
        index: true 
      },

    playerId: {
      type: String,
      required: true,
      index: true
    },

    eventType: {
      type: String, // RUN, SIX, GOAL, WICKET
      required: true
    },

    eventValue: {
      type: Number // 1, 2, 6, etc
    },

    fantasyPoints: {
      type: Number,
      required: true
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed, // same as JSONB
      default: {}
    },

    createdBy: {
      type: String,
      enum: ['ADMIN', 'SYSTEM'],
      default: 'SYSTEM'
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

matchEventSchema.index({ matchId: 1, contestId: 1, playerId: 1 });
matchEventSchema.index({ contestId: 1, gameId: 1, eventType: 1 });

module.exports = mongoose.model('MatchEvent', matchEventSchema);
