const mongoose = require("mongoose");

const categoriasSchema = {
  nombre: String,
  imagen: String,
};

const Categorias = mongoose.model(
  "Categorias",
  new mongoose.Schema(categoriasSchema),
  "Categorias"
);

module.exports = Categorias;
