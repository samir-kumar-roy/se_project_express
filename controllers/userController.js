const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const ERROR_CODES = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(ERROR_CODES.BAD_REQUEST).send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch(() => {
      res.status(401).send({ message: "Incorrect email or password" });
    });
};
getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = ERROR_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid data" });
      }
      if (err.statusCode === ERROR_CODES.NOT_FOUND) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: "User not found" });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = ERROR_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid data" });
      }
      if (err.statusCode === ERROR_CODES.NOT_FOUND) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: "User not found" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid data" });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    return res.status(ERROR_CODES.BAD_REQUEST).send({ message: "Invalid data" });
    return;
  }

  User.create({ name, avatar, email, password })
    .then((user) => {
      delete user.password;
      res.status(ERROR_CODES.CREATED).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        res.status(ERROR_CODES.CONFLICT).send({ message: "Email already exists" });
      } else if (err.name === "ValidationError") {
        res.status(ERROR_CODES.BAD_REQUEST).send({ message: "Invalid data" });
      } else {
        res
          .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

module.exports = {
  login,
  getCurrentUser,
  updateProfile,
  createUser,
};
