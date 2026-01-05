const mongoose = require('mongoose');

const TeamMasterSchema = new mongoose.Schema({
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    shortName: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },

    logo: {
      type: String
    },

    country: {
      type: String
    },

    homeCity: {
      type: String
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
      index: true
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

TeamMasterSchema.index(
  { gameId: 1, shortName: 1 },
  { unique: true }
);

const teamMasterModel  = mongoose.model('TeamMaster', TeamMasterSchema);
module.exports = teamMasterModel ; 