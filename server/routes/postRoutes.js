const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    createPost,
    getPosts,
    deletePost,
    toggleLike,
    getPostsByUser
} = require("../controllers/postController");

router.post("/", auth, createPost);

router.get("/", getPosts);

router.get("/user/:userId", getPostsByUser);

router.delete("/:id", auth, deletePost);

// Like / Unlike
router.put("/:id/like", auth, toggleLike);

module.exports = router;