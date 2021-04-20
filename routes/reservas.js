var express = require('express');
var router = express.Router();
var reservasController = require("../controllers/reservasController");

// Create
router.get("/crear",reservasController.mostrar);
router.post("/crear",reservasController.crear);



module.exports = router;
