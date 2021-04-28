let db = require("../database/models");
const { QueryTypes } = require("sequelize");

let usuariosController = {
    mostrar: function(req,res) {
        return res.render("registrarUsuario");
    },
    guardar: async function(req,res) {
        let sql = "INSERT INTO oma_lissi.clientes () VALUES ();";
        const registarse= await db.sequelize.query(sql,{type: QueryTypes.INSERT});//try catch
        console.log(registarse);
        res.render("usuarioCreado");//poner en la vista: Usuario creado con exito.
    }
}

module.exports = usuariosController;