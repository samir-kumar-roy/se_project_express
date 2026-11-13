const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const ERROR_CODES = require("../utils/errors");
const UnauthorizedError = require("../errors/unauthorized-error");
const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ConflictError = require("../errors/conflict-error");
const InternalServerError = require("../errors/internal-server-error");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return Promise.reject(new BadRequestError('Email and password are required'));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return Promise.reject(new UnauthorizedError('Incorrect email or password'));
      }
      return Promise.reject(new InternalServerError("An error has occurred on the server."));
    });
};
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('User not found');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return Promise.reject(new BadRequestError('Invalid data'));
      }
      if (err.statusCode === ERROR_CODES.NOT_FOUND) {
        return Promise.reject(new NotFoundError('User not found'));
      }
      return Promise.reject(new InternalServerError("An error has occurred on the server."));
    });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => Promise.reject(new NotFoundError('User not found')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return Promise.reject(new BadRequestError('Invalid data'));
      }
      if (err.statusCode === ERROR_CODES.NOT_FOUND) {
        return Promise.reject(new NotFoundError('User not found'));
      }
      if (err.name === "ValidationError") {
        return Promise.reject(new BadRequestError('Invalid data'));
      }
      return Promise.reject(new InternalServerError("An error has occurred on the server."));
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    return Promise.reject(new BadRequestError('Email and password are required'));
  }

  return User.create({ name, avatar, email, password })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(ERROR_CODES.CREATED).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return Promise.reject(new ConflictError('Email already exists'));
      }
      if (err.name === "ValidationError") {
        return Promise.reject(new BadRequestError('Invalid data'));
      }
      return Promise.reject(new InternalServerError("An error has occurred on the server."));
    });
};

module.exports = {
  login,
  getCurrentUser,
  updateProfile,
  createUser,
};
