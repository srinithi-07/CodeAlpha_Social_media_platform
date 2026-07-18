const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { toggleFollow } = require("../controllers/userController");

router.put("/follow/:id", auth, toggleFollow);

module.exports = router;