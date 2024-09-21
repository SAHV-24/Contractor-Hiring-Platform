const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.listen(PORT, () => {
  console.log("Server Listening on PORT:" + PORT);
});

module.exports = app;
