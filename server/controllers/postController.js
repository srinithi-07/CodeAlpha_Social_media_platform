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

// Delete Post
const deletePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this post"
            });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Like / Unlike Post
const toggleLike = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const userId = req.user._id.toString();

        const alreadyLiked = post.likes.some(
            id => id.toString() === userId
        );

        if (alreadyLiked) {
            post.likes = post.likes.filter(
                id => id.toString() !== userId
            );

            await post.save();

            return res.status(200).json({
                message: "Post unliked",
                likes: post.likes.length
            });
        }

        post.likes.push(req.user._id);

        await post.save();

        res.status(200).json({
            message: "Post liked",
            likes: post.likes.length
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    createPost,
    getPosts,
    deletePost,
    toggleLike
};