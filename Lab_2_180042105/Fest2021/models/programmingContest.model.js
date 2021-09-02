const mongoose = require("mongoose");
const PCSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  selected: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  coachName: {
    type: String,
    required: true,
  },
  coachContact: {
    type: String,
    required: true,
  },
  coachEmail: {
    type: String,
    required: true,
  },
  coachTshirt: {
    type: String,
    required: true,
  },

  tleadName: {
    type: String,
    required: true,
  },
  tleadContact: {
    type: String,
    required: true,
  },
  tleadEmail: {
    type: String,
    required: true,
  },
  tleadtshirt: {
    type: String,
    required: true,
  },

  tm1Name: {
    type: String,
    required: true,
  },
  tm1Contact: {
    type: String,
    required: true,
  },
  tm1Email: {
    type: String,
    required: true,
  },
  tm1tshirt: {
    type: String,
    required: true,
  },

  tm2Name: {
    type: String,
    required: true,
  },
  tm2Contact: {
    type: String,
    required: true,
  },
  tm2Email: {
    type: String,
    required: true,
  },
  tm2tshirt: {
    type: String,
    required: true,
  },
  mailId: {
    type:String,
    unique:true,
    },
})

const ProgContest = mongoose.model("programming-contest", PCSchema);
module.exports = ProgContest;