const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

//Update user
router.post("/updateuser/:id", async (req, res) => {
  if (req.body.id === req.params.id || req.body.isadmin) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
    } catch (error) {
      res.json("Internal Server Error");
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      res.json("Internal Server Error");
    }
  } else {
    res.status(403).json("You can only update your account");
  }
});

//Delete user
router.delete("/deleteuser/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      let user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json("User Not Found");
      } else {
        res.json(`User with username (${user.username}) has been deleted`);
      }
    } catch (error) {
      res.status(503).json("Internal Server error");
      console.log(error);
    }
  } else {
    res.status(403).json("You can only delete your account");
  }
});

//Get user
router.get("/", async (req, res) => {
  const userid = req.query.userid;
  const username = req.query.username;
  try {
    const user = userid
      ? await User.findById(userid)
      : await User.findOne({username: username})
    if (!user) {
      return res.status(404).json("User Not Found");
    } else {
      const { password, ...others } = user._doc;
      return res.status(200).json(others);
    }
  } catch (error) {
    res.status(503).json("Internal Server Error");
  }
});

//Follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.id !== req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User Not Found");
      }
      let currentUser = await User.findById(req.body.id);
      if (!currentUser) {
        return res.status(404).json("User Not Found");
      }
      if (!currentUser.following.includes(user._id)) {
        try {
          await user.updateOne({ $push: { followers: currentUser._id } });
          await currentUser.updateOne({ $push: { following: user._id } });
          res.status(200).json(`${user.username} has been followed by you`);
        } catch (error) {
          res.status(500).json("Internal Server Error");
        }
      } else {
        res
          .status(200)
          .json(`You are already a follower of ${user.username}...`);
      }
    } catch (error) {
      res.status(500).json("Internal Server Error");
      console.log(error);
    }
  } else {
    res.status(403).json("You can't follow your self");
  }
});

//Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.id !== req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User Not Found");
      }
      let currentUser = await User.findById(req.body.id);
      if (!currentUser) {
        return res.status(404).json("User Not Found");
      }
      if (currentUser.following.includes(user._id)) {
        try {
          await user.updateOne({ $pull: { followers: currentUser._id } });
          await currentUser.updateOne({ $pull: { following: user._id } });
          res.status(200).json("User has been unfollowed");
        } catch (error) {
          res.status(500).json("Internal Server Error");
        }
      } else {
        res.status(200).json("You are not a follower of this user...");
      }
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(403).json("You can't follow or unfollow yourself");
  }
});

//Fetch Friends
router.get('/friends/:id', async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    const friendsinfo = []
    const friends = await Promise.all(
      user.following.map((friendid)=>{
        return User.findById(friendid)
      })
    )
    friends.map((friend)=>{
      const {_id,username,profile} = friend
      friendsinfo.push({_id,username,profile})
    })
    res.status(200).json(friendsinfo)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;