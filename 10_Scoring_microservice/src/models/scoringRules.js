const mongoose = require('mongoose');

const scoringRulesSchema = new mongoose.Schema(
  {
    gameId: {
      type: String, // CRICKET, FOOTBALL
      required: true,
      
    },

    contestId: {
      type: String, // contest Level
      
    },
    matchId: {
      type: String, // match level 
      
    },

    eventType: {
      type: String, // GOAL, SIX, WICKET
      required: true
    },

    points: {
      type: Number,
      required: true
    },

    conditions: {
      type: mongoose.Schema.Types.Mixed, // same as JSONB
      default: {}
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

scoringRulesSchema.index({ gameId: 1, eventType: 1, isActive: 1 });
scoringRulesSchema.index({ contestId: 1, eventType: 1, isActive: 1 });


module.exports = mongoose.model('ScoringRule', scoringRulesSchema);
