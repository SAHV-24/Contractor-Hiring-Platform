const mongoose = require("mongoose");

const dbConnection = mongoose.connect(
  "mongodb+srv://sergio:sahv2407@clustersergiouao.l2sbp.mongodb.net/ProyectoED"
);


module.exports = dbConnection;
