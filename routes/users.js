const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCurrentUser,
  updateProfile,
} = require("../controllers/userController");

// All user routes require authentication
router.use(auth);

// GET /users/me - Get current user
router.get("/me", getCurrentUser);

// PATCH /users/me - Update current user profile
router.patch("/me", updateProfile);

module.exports = router;
