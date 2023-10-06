var express = require("express");
var router = express.Router();
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

const User = require("../models/users");
const Pwitt = require("../models/pwitts");
const checkUserBody = require("../modules/checkUserBody");

// Signup user
router.post("/signup", (req, res) => {
  // Check if require fields are completed
  if (!checkUserBody(req.body, ["username", "password", "firstname"])) {
    return res
      .status(400)
      .json({ result: false, error: "Missing or empty fields" });
  }

  // Remove all space in username string
  const username = req.body.username.replace(/ /g, "");

  // Remove start and end space in firstname string
  const firstname = req.body.firstname.trim();

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then((foundUser) => {
    if (!foundUser) {
      // Create new user
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: firstname,
        username: username,
        password: hash,
        token: uid2(32),
        picture: req.body.picture,
        likedList: [],
      });

      newUser
        .save()
        .then((user) => {
          return res.json({
            result: true,
            userInfo: {
              token: user.token,
              firstname: user.firstname,
              username: user.username,
              picture: user.picture,
              likedList: user.likedList,
            },
          });
        })
        .catch((error) => {
          // Set custom error for unique keys
          let errMsg;
          if (error.code == 11000) {
            errMsg = Object.keys(error.keyValue)[0] + " already exists.";
          } else {
            errMsg = error.message;
          }
          return res.status(400).json({ result: false, error: errMsg });
        });
    } else {
      // User already exists in database
      return res
        .status(400)
        .json({ result: false, error: "User already exists" });
    }
  });
});

// Signin user
router.post("/signin", (req, res) => {
  // Check if require fields are completed
  if (!checkUserBody(req.body, ["username", "password"])) {
    return res
      .status(400)
      .json({ result: false, error: "Missing or empty fields" });
  }

  // Check if user exists
  User.findOne({ username: req.body.username }).then((user) => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // Signin user and return user's token
      return res.json({ result: true, token: user.token });
    } else {
      // Error message if not found
      return res
        .status(400)
        .json({ result: false, error: "User not found or wrong password" });
    }
  });
});

// Like a pwitt
router.post("/addLike", (req, res) => {
  const { token, pwittId } = req.body;
  // Update user's liked list
  User.updateOne({ token }, { $push: { likedList: pwittId } })
    .then((data) => {
      if (data.modifiedCount) {
        // Pwitt added in like list
        return res.json({ result: true, pwittLiked: pwittId });
      } else {
        // Pwitt not added in like list
        return res
          .status(400)
          .json({ result: false, error: "Pwitt not liked" });
      }
    })
    // Update error
    .catch((error) => res.status(400).json({ result: false, error }));
});

// Unlike a pwitt
router.post("/removeLike", (req, res) => {
  const { token, pwittId } = req.body;
  // Update user's liked list
  User.updateOne({ token }, { $pull: { likedList: pwittId } })
    .then((data) => {
      if (data.modifiedCount) {
        // Pwitt removed in like list
        return res.json({ result: true, pwittUnliked: pwittId });
      } else {
        // Pwitt not removed in like list
        return res
          .status(400)
          .json({ result: false, error: "Pwitt not unliked" });
      }
    })
    // Update error
    .catch((error) => res.status(400).json({ result: false, error }));
});

module.exports = router;
