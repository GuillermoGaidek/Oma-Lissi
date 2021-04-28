let db = require("../database/models");
const { QueryTypes } = require("sequelize");

let reservasController = {
    mostrar: function(req,res) {
        return res.render("crearReservas");
    },
    guardar: async function(req,res) {
        let sql = "INSERT INTO oma_lissi.reservas () VALUES ();";
        const reservas= await db.sequelize.query(sql,{type: QueryTypes.INSERT});
        console.log(reservas);
        res.render("reservaCreada");//poner en la vista como un resumen: REserva creada con exito. Idreserva,fecha creacion,dni,nombre,apellido,telefono,email,ocupacion,desde,hasta,cantidad personas
    }
}

module.exports = reservasController;