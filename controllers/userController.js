const User = require("../models/user");
const ERROR_CODES = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
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

const createUser = (req, res) =>{
  const { name, avatar } = req.body;

  if (!name || !avatar) {
    res.status(ERROR_CODES.BAD_REQUEST).send({ message: "Invalid data" });
    return;
  }
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(ERROR_CODES.BAD_REQUEST).send({ message: "Invalid data" });
      } else {
        res
          .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server." });
      }
    });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
