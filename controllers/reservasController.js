let db = require("../database/models");
const { QueryTypes } = require("sequelize");

let reservasController = {
    mostrar: async function(req,res) {
        /*let sqlCliente = "SELECT dni,nombre,apellido,telefono,mail,ocupacion,cuenta_bancaria FROM oma_lissi.clientes WHERE email = ???req.deDondeSacoElMail???";
        const datosCliente= await db.sequelize.query(sqlCliente,{type: QueryTypes.SELECT});
        console.log(datosCliente);*/
        return res.render("crearReservas")//,{datosCliente:datosCliente});
    },
    crear: async function(req,res) {
        let sql = "INSERT INTO oma_lissi.reservas (dni,monto_total,monto_seña,fecha_creacion_reserva) VALUES ('???db.dni???', '3333', '222', '???currentData???');";
        const reservas= await db.sequelize.query(sql,{type: QueryTypes.CREATE});
        console.log(reservas);
        res.redirect("/reservas/crear");
    }
}

module.exports = reservasController;