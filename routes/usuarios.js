var express = require('express');
var router = express.Router();
var usuariosController = require("../controllers/usuariosController");
var notLogMiddle = require('../middlewares/notLogMiddleware');
var logMiddle = require('../middlewares/LogMiddleware');
// Register
router.get("/register",notLogMiddle,usuariosController.registrar);
router.post("/register",usuariosController.guardar);

// Login
router.get("/login",notLogMiddle,usuariosController.login);
router.post("/login",usuariosController.validarLogin);

// Perfil
router.get("/perfil",logMiddle,usuariosController.perfil);
router.get("/perfil/:email",logMiddle,usuariosController.misDatos);

module.exports = router;
