const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const router = express.Router();

//Creating Post
router.post("/createpost", async (req, res) => {
  const post = await Post.create(req.body);
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

//Update Post
router.put("/updatepost/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    if (post.userid === req.body.userid) {
      try {
        await post.updateOne({ $set: req.body }, { new: true });
        res.status(200).json("Post has been updated");
      } catch (error) {
        res.status(500).json("Internal Server Error");
      }
    } else {
      res.status(403).json("You can only update your post");
    }
  } else {
    res.status(404).json("Post Not Found");
  }
});

//Delete Post
router.delete("/deletepost/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    try {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  } else {
    res.status(404).json("Post not found");
  }
});

//Like or Dislike Post
router.put("/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    try {
      if (!post.likes.includes(req.body.userid)) {
        await post.updateOne({ $push: { likes: req.body.userid } });
        res.status(200).json("Post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userid } });
        res.status(200).json("Post has been disliked");
      }
    } catch (error) {
      res.status(500).json("Internal server Error");
    }
  } else {
    res.status(404).json("Post not found");
  }
});

//Get a Post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    try {
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  } else {
    res.status(404).json("Post Not Found");
  }
});

//Get all Post
router.get("/timeline/:userid", async (req, res) => {
  const currentUser = await User.findById(req.params.userid);
  if (currentUser) {
    try {
      const userPosts = await Post.find({ userid: currentUser._id });
      const friendsPosts = await Promise.all(
        currentUser.following.map((friendid) => {
          return Post.find({ userid: friendid });
        })
      );
      res.status(200).json(userPosts.concat(...friendsPosts));
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(404).json("User Not Found");
  }
});

//get user's all post
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username})
    const posts = await Post.find({ userid: user._id})  
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
