const mongoose = require("mongoose");

const trabajosSchema = new mongoose.Schema({
  fotoTrabajo: String,
});

const categoriasOfrecidasSchema = new mongoose.Schema({
  idCategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorias",
  },
  precioCategoria: Number,
});

const contratistaSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  ciudad: String,
  especialidad: String,
  email: String,
  username: String,
  password: String,
  fotoDePerfil: String,
  ultimosTrabajos: [trabajosSchema],
  categoriasOfrecidas: [categoriasOfrecidasSchema],
});

const Contratistas = mongoose.model("Contratistas", contratistaSchema,"Contratistas");

module.exports = Contratistas;
