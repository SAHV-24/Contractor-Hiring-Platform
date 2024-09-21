const mongoose = require("mongoose");

const citasSchema = {
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" },
  idContratista: { type: mongoose.Schema.Types.ObjectId, ref: "Contratistas" },
  idCategoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categorias" },
  fecha: Date,
  hora: String,
  locacion: String,
  estado: ["Confirmada", "Cancelada", "En Espera"],
  ratingUsuario: Number,
};

const Citas = mongoose.model("Citas", citasSchema, "Citas");

module.exports = Citas;
