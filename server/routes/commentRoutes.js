const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    addComment,
    getComments
} = require("../controllers/commentController");

router.post("/:postId", auth, addComment);

router.get("/:postId", getComments);

module.exports = router;