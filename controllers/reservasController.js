let db = require("../database/models");
const { QueryTypes } = require("sequelize");

let reservasController = {
    mostrar: function(req,res) {
        return res.render("crearReservas");
    },
    crear: async function(req,res) {
        let sql = "INSERT INTO oma_lissi.reservas (dni,monto_total,monto_seña,fecha_creacion_reserva) VALUES ('123', '3333', '222', '2021-04-19');";
        const reservas= await db.sequelize.query(sql,{type: QueryTypes.CREATE});
        console.log(reservas);
        res.redirect(/reservas/crear);
    }
}

module.exports = reservasController;