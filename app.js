const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const routers = require("./routes/index");
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require("./middlewares/error");
const ERROR_CODES = require("./utils/errors");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
const app = express();
app.use(cors());
app.use(express.json());
// Request logging middleware
app.use(requestLogger);

// Routes
app.use(routers);
// centralized Error handling middleware
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
