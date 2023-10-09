const mongoose = require("mongoose");

const pwittSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  pwittDate: Date,
  pwittContent: String,
});

const Pwitt = mongoose.model("pwitts", pwittSchema);

module.exports = Pwitt;
