var express = require("express");
var router = express.Router();

const Pwitt = require("../models/pwitts");
const User = require('../models/users');
const Hashtag = require("../models/hashtags");

// POST ONE PWITT

router.post("/", (req, res) => {
  const { token, pwittContent } = req.body;
  const pwittDate = new Date();

  console.log('req.body', req.body)

  User.find({ token })
    .then(user => {
      if (user) {
        const newPwitt = new Pwitt({
          author: user._id,
          pwittDate,
          pwittContent,
        });
        newPwitt
          .save()
          .then((data) => res.json({ result: true }))
          .catch((error) => res.json({ result: false, error }));
      } else {
        return res.json({ result: false, error: 'User not found.' })
      }
    });
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
    .populate('author')
    .then((pwitts) => res.json(pwitts))
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
