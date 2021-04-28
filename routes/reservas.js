var express = require('express');
var router = express.Router();
var reservasController = require("../controllers/reservasController");

// Create
router.get("/crear",reservasController.mostrar);
router.post("/crear",reservasController.guardar);



module.exports = router;
