var express = require('express');
var router = express.Router();
var usuariosController = require("../controllers/usuariosController");

// Register
router.get("/register",usuariosController.mostrar);
router.post("/register",usuariosController.guardar);

// Login

module.exports = router;
