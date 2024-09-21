const mongoose = require("mongoose");

const dbConnection = mongoose.connect(
  "mongodb+srv://root:vayEr74ZySThAyrj@clustersergiouao.l2sbp.mongodb.net/ProyectoED"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Connected to Database");
});

module.exports = mongoose;
