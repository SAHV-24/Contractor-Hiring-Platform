const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const router = require("./router/router.cjs");
const db = require("./db/db.cjs");

require("dotenv").config(); // file for protecting the info

const app = express();

const env = process.env;
const PORT = env.PORT;
const frontendURI = env.localFrontURI

app.use(express.json());
app.use(
  cors({
    origin: frontendURI,
  })
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:" + PORT);
});

module.exports = app;
