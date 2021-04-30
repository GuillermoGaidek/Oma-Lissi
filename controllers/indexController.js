let db = require("../database/models");
const { QueryTypes } = require("sequelize");

let indexController = {
    mostrar: function(req,res) {
        res.render("index");
    }
}

module.exports = indexController;