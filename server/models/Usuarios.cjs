const mongoose = require("mongoose");

const usuariosSchema = {
  email: String,
  nombre: String,
  apellido: String,
  ciudad: String,
  username: String,
  password: String,
  fotoDePerfil: String,
  ultimasCategorias: Array,
};
const Usuarios = mongoose.model(
  "Usuarios",
  new mongoose.Schema(usuariosSchema),
  "Usuarios"
);

module.exports = Usuarios