let db = require("../database/models");
const { QueryTypes } = require("sequelize");

let usuariosController = {
    mostrar: function(req,res) {
        return res.render("registrarUsuario");
    },
    guardar: async function(req,res) {
        let today = new Date().toISOString().slice(0, 10) //fecha de hoy en formato SQL
        let sql = `INSERT INTO oma_lissi.clientes (dni,nombre,apellido,telefono,mail,ocupacion,contraseña,fecha_creacion_cliente) VALUES ('${req.body.dni}','${req.body.nombre}','${req.body.apellido}','${req.body.telefono}','${req.body.email}','${req.body.ocupacion}','${req.body.contraseña}','${today}');`;
        
        const registarse= await db.sequelize.query(sql,{type: QueryTypes.INSERT});//poner en estructura try catch

        res.render("usuarioCreado");//poner en la vista: Usuario creado con exito.
    }
}

module.exports = usuariosController;