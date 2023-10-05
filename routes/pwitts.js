var express = require("express");
var router = express.Router();

const User = require("../models/users");
const Pwitt = require("../models/pwitts");

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

router.get("/allpwitts");

// GET PWITT BY #

// GET PWITT BY LIKE

module.exports = router;
