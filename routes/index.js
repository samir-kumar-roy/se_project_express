const router = require("express").Router();
const ERROR_CODES = require("../utils/errors");

// Import route modules
const usersRouter = require("./users");
const itemsRouter = require("./items");

// Import controllers
const { login } = require("../controllers/users");
const { createUser } = require("../controllers/userController");

// Auth routes
router.post("/signin", login);
router.post("/signup", createUser);

// Use route modules
router.use("/users", usersRouter);
router.use("/items", itemsRouter);

// Handle non-existent resources (404)
router.use((req, res) => {
  res
    .status(ERROR_CODES.NOT_FOUND)
    .send({ message: "Requested resource not found" });
});

module.exports = router;