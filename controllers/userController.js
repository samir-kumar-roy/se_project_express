const User = require("../models/user");
const ERROR_CODES = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = ERROR_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid user ID" });
      }
      if (err.statusCode === ERROR_CODES.NOT_FOUND) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: "User ID not found" });
      }
      res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  if (!name || !avatar) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: "Name and avatar are required" });
  }

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid user data" });
      }
      res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
