var express = require("express");
var router = express.Router();

const Pwitt = require("../models/pwitts");
const Hashtag = require("../models/hashtags");

// POST ONE PWITT

router.post("/", (req, res) => {
  const userId = req.body.userId;
  const pwittDate = new Date();
  const pwittContent = req.body.pwittContent;

  const newPwitt = new Pwitt({
    userId,
    pwittDate,
    pwittContent,
  });
  newPwitt
    .save()
    .then((data) => res.json({ result: true }))
    .catch((error) => res.json({ result: false, error }));
});

// DELETE ONE PWITT

router.delete("/", (req, res) => {
  const pwittId = req.body.pwittId;

  Pwitt.findOneAndDelete({ _id: pwittId })
    .then((data) => {
      if (data) {
        return res.json({ result: true, deletedPwitt: pwittId });
      } else {
        return res.json({
          result: false,
          error: "Delete impossible pwitt not found",
        });
      }
    })
    .catch((error) => res.json({ result: false, error }));
});

// GET ALL PWITTS

router.get("/", (req, res) => {
  Pwitt.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ result: false, error }));
});

// GET PWITT BY #

router.get("/byHashtag/:hashtag", (req, res) => {
  const hashtag = req.params.hashtag;

  Hashtag.findOne({ hashtag })
    .populate('pwitts')
    .then(hashtagObj => {
      if (hashtagObj) {
        return res.json({ result: true, pwitts: hashtagObj.pwitts });
      } else {
        return res.status(400).json({ result: false, error: "No hashtag found" });
      }
    })
    .catch(error => res.status(400).json({ result: false, error }));
});

module.exports = router;
