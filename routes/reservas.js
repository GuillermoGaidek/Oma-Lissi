var express = require('express');
var router = express.Router();
var reservasController = require("../controllers/reservasController");
var logMiddle = require('../middlewares/LogMiddleware');

// Create
router.get("/crear",logMiddle,reservasController.mostrar);
router.post("/crear",reservasController.guardar);



module.exports = router;
