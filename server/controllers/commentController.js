const Comment = require("../models/Comment");

// Add Comment
const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        const comment = await Comment.create({
            post: req.params.postId,
            author: req.user._id,
            text
        });

        res.status(201).json({
            message: "Comment added successfully",
            comment
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get Comments of a Post
const getComments = async (req, res) => {
    try {

        const comments = await Comment.find({
            post: req.params.postId
        })
        .populate("author", "username profilePic")
        .sort({ createdAt: 1 });

        res.status(200).json(comments);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    addComment,
    getComments
};