const express = require("express");
const router = express.Router();

const categoriasController = require("../controllers/categoriasController.cjs");
const citasController = require("../controllers/citasController.cjs");
const usuariosController = require("../controllers/usuariosController.cjs");
const contratistasController = require("../controllers/contratistasController.cjs");

router.get("/Usuarios", usuariosController.getAll);
router.get("/Contratistas", contratistasController.getAll);
router.get("/Categorias", categoriasController.getAll);
router.get("/Citas", citasController.getAll);

router.post("/Usuarios/insert", usuariosController.insert);
router.post("/Contratistas/insert", contratistasController.insert);
router.post("/Categorias/insert", categoriasController.insert);
router.post("/Citas/insert", citasController.insert);

router.put("/Usuarios/update/:id", usuariosController.update);
router.put("/Contratistas/update/:id", contratistasController.update);
router.put("/Categorias/update/:id", categoriasController.update);
router.put("/Citas/update/:id", citasController.update);

router.delete("/Usuarios/delete/:id", usuariosController.delete);
router.delete("/Contratistas/delete/:id", contratistasController.delete);
router.delete("/Categorias/delete/:id", categoriasController.delete);
router.delete("/Citas/delete/:id", citasController.delete);

module.exports = router;
