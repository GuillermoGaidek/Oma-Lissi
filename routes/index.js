var express = require('express');
var router = express.Router();
var indexController = require("../controllers/indexController");

router.get("/",indexController.mostrar);//pongo el get primero porque tiene que ver los campos etc. Despues el post.

module.exports = router;
