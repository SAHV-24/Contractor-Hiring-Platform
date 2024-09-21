const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const router = require("./router/router.cjs")
const db = require("./db/db.cjs")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api",router)

app.listen(PORT, () => {
  console.log("Server Listening on PORT:" + PORT);
});

module.exports = app;
