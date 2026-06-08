const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routers = require("./routes/index");
const ERROR_CODES = require("./utils/errors");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use(routers);

app.listen(PORT, () => {});
