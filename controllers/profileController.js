const User = require("../models/User");

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.render("profile/profile", {
            title: "Profile",
            user
        });

    } catch (error) {

        console.log(error);

    }

};

module.exports = {
    getProfile
};