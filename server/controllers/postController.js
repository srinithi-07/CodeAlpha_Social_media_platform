const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
    try {
        const { caption } = req.body;

        const post = await Post.create({
            author: req.user._id,
            caption
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get All Posts
const getPosts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate("author", "username profilePic")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    createPost,
    getPosts
};