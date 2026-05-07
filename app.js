const express = require("express");
const mongoose = require("mongoose");
const routers = require("./routes/index");
const ERROR_CODES = require("./utils/errors");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "69ecb56376e0ec00e1bfd167",
  };
  next();
});

// Routes
app.use(routers);

// Handle non-existent resources
app.use((req, res) => res
    .status(ERROR_CODES.NOT_FOUND)
    .send({ message: "Requested resource not found" }));

app.listen(PORT, () => {});
