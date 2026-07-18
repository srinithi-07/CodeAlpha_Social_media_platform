const User = require("../models/User");

// Follow or Unfollow User
const toggleFollow = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        const targetUser = await User.findById(req.params.id);

        if (!targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent following yourself
        if (currentUser._id.toString() === targetUser._id.toString()) {
            return res
                .status(400)
                .json({ message: "You cannot follow yourself." });
        }

        const alreadyFollowing = currentUser.following.includes(targetUser._id);

        if (alreadyFollowing) {
            currentUser.following.pull(targetUser._id);
            targetUser.followers.pull(currentUser._id);

            await currentUser.save();
            await targetUser.save();

            return res.json({
                message: "User unfollowed successfully",
            });
        }

        currentUser.following.push(targetUser._id);
        targetUser.followers.push(currentUser._id);

        await currentUser.save();
        await targetUser.save();

        res.json({
            message: "User followed successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    toggleFollow,
};