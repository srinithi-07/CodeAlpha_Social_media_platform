const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    toggleFollow,
    getUserProfile
} = require("../controllers/userController");

router.get("/:id", auth, getUserProfile);

router.put("/follow/:id", auth, toggleFollow);

module.exports = router;