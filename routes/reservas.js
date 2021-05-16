var express = require('express');
var router = express.Router();
var reservasController = require("../controllers/reservasController");
var logMiddle = require('../middlewares/LogMiddleware');

// Create
router.get("/crear",logMiddle,reservasController.mostrar);
router.post("/crear",logMiddle,reservasController.guardar);

// Read
router.get("/listado",logMiddle,reservasController.listar);
router.get("/listado/:id",logMiddle,reservasController.listarDetalles);

// Update
router.get("/modificar/:id",logMiddle,reservasController.modificar);
router.post("/modificar/:id",logMiddle,reservasController.guardarModificacion);

// Delete
router.get("/modificar/:id",logMiddle,reservasController.modificar);
router.post("/modificar/:id",logMiddle,reservasController.guardarModificacion);

module.exports = router;
