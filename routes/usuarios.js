var express = require('express');
var router = express.Router();
var usuariosController = require("../controllers/usuariosController");
var notLogMiddle = require('../middlewares/notLogMiddleware');

// Register
router.get("/register",notLogMiddle,usuariosController.registrar);
router.post("/register",usuariosController.guardar);

// Login
router.get("/login",notLogMiddle,usuariosController.login);//Si ya esta logeado que en el header en vez de iniciar sesion y registrarse que aparezca el perfil con el CRUD.
router.post("/login",usuariosController.validarLogin);

module.exports = router;
