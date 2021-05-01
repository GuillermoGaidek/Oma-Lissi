let db = require("../database/models");
const { QueryTypes } = require("sequelize");

let reservasController = {
    mostrar: function(req,res) {
        res.render("crearReservas");
    },
    guardar: async function(req,res) {
        let sql = `INSERT INTO oma_lissi.reservas () VALUES ();`;
        const reservas= await db.sequelize.query(sql,{type: QueryTypes.INSERT});
        console.log(reservas);
        res.render("reservaCreada");//poner en la vista como un resumen: REserva creada con exito. Idreserva,fecha creacion,dni,nombre,apellido,telefono,email,ocupacion,desde,hasta,cantidad personas
    },
    listar: async function(req,res){
        let sql = `SELECT r.cod_reserva FROM oma_lissi.reservas as r LEFT JOIN oma_lissi.clientes as c on r.dni=c.dni WHERE c.mail = '${req.session.usuarioLogeado}';`;
        const listado= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
        console.log(listado);
        res.render("reservasListado",{listado:listado});
    },
    listarDetalles: async function(req,res){
        let sql = `SELECT DISTINCT r.cod_reserva,r.monto_total,r.monto_seña,r.fecha_creacion_reserva,sum(cant_personas) as cant_personas,rtc.fecha_entrada,rtc.fecha_salida
        FROM oma_lissi.reservas as r  
        LEFT JOIN oma_lissi.reservas_tiene_cabañas as rtc 
            on r.cod_reserva = rtc.cod_reserva 
        WHERE r.cod_reserva = ${req.params.id};`;
        const detalle= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
        console.log(detalle);
        res.render("reservasDetalle",{detalle:detalle});
    }
}

module.exports = reservasController;