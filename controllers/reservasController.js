let db = require("../database/models");
//const { QueryTypes } = require("sequelize");

let reservasController = {
    crear: async function(req,res) {
        const reservas = await db.sequelize.query("SELECT * FROM oma_lissi.reservas");
        //,{ type: QueryTypes.SELECT });
        return res.render("listadoReservas",{reservas:reservas});
    }
}

module.exports = reservasController;