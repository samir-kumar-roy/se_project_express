const router = require("express").Router();
const NotFoundError = require("../errors/not-found-error");

// Import route modules
const usersRouter = require("./users");
const itemsRouter = require("./items");

// Import controllers
const { createUser, login } = require("../controllers/userController");

// Import validation middleware
const { validateLogin, validateUserBody } = require("../middlewares/validation");

// Auth routes
router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);

// Use route modules
router.use("/users", usersRouter);
router.use("/items", itemsRouter);

// Handle non-existent resources (404)
router.use(() => Promise.reject(new NotFoundError('Requested resource not found')));

module.exports = router;
