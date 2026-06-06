const express = require("express");
const mongoose = require("mongoose");
const routers = require("./routes/index");
const ERROR_CODES = require("./utils/errors");
const cors = require("cors");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use(routers);

// Handle non-existent resources
app.use((req, res) =>
  res
    .status(ERROR_CODES.NOT_FOUND)
    .send({ message: "Requested resource not found" })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
