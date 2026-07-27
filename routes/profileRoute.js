const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

// Get Profile
router.get(
    "/",
    authMiddleware,
    profileController.getProfile
);

/*
// Update Profile
router.put(
    "/",
    authMiddleware,
    updateProfileValidator,
    validationMiddleware,
    profileController.updateProfile
);

// Change Password
router.put(
    "/change-password",
    authMiddleware,
    changePasswordValidator,
    validationMiddleware,
    profileController.changePassword
);
*/

module.exports = router;