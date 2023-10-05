const mongoose = require("mongoose");

const hashtagSchema = mongoose.Schema({
  hashtag: String,
  pwitts: [{ type: mongoose.Schema.Types.ObjectId, ref: "pwitts" }],
});

const Hashtag = mongoose.model("hashtags", hashtagSchema);

module.exports = Hashtag;
