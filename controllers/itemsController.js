const ClothingItem = require("../models/clothingItem");
const ERROR_CODES = require("../utils/errors");
const InternalServerError  = require("../errors/internal-server-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");

const getItems = (req, res,next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() =>
      next(new InternalServerError("An error has occurred on the server."))
    );
};

const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(ERROR_CODES.CREATED).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return Promise.reject(new BadRequestError('Invalid data'));
      }
      return Promise.reject(new InternalServerError("An error has occurred on the server."));
    });
};

const deleteItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return Promise.reject(new UnauthorizedError("You do not have permission to delete this item"));
      }
      return ClothingItem.findByIdAndDelete(req.params.itemId).then(() =>
        res.send({ message: "Item deleted successfully" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return Promise.reject(new BadRequestError('Invalid data'));
      }
      if (err.name === "DocumentNotFoundError") {
        return Promise.reject(new NotFoundError('Item not found'));
      }
      return Promise.reject(new InternalServerError("An error has occurred on the server."));
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return Promise.reject(new BadRequestError('Invalid data'));
      }
      if (err.name === "DocumentNotFoundError") {
        return Promise.reject(new NotFoundError('Item not found'));
      }
      return Promise.reject(new InternalServerError("An error has occurred on the server."));
    });
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return Promise.reject(new BadRequestError('Invalid data'));
      }
      if (err.name === "DocumentNotFoundError") {
        return Promise.reject(new NotFoundError('Item not found'));
      }
      return Promise.reject(new InternalServerError("An error has occurred on the server."));
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
