var express = require('express');
var router = express.Router();
var reservasController = require("../controllers/reservasController");

// Create
router.get("/crear",reservasController.crear);//pongo el get primero porque tiene que ver los campos etc. Despues el post.

module.exports = router;
