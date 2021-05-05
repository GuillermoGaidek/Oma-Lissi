let db = require("../database/models");
const { QueryTypes } = require("sequelize");

let reservasController = {
    mostrar: function(req,res) {
        res.render("crearReservas",{usuarioLogeado: req.session.usuarioLogeado});
    },
    guardar: async function(req,res) {
        let today = new Date().toISOString().slice(0, 10)

        let sql0 = `SELECT dni FROM oma_lissi.clientes WHERE mail='${req.session.usuarioLogeado}';`;
        const obtenerDni= await db.sequelize.query(sql0,{type: QueryTypes.SELECT});
        console.log(obtenerDni);

        let sql1 = `INSERT INTO oma_lissi.reservas (dni,monto_total,monto_seña,fecha_creacion_reserva) VALUES (${obtenerDni[0].dni},1000,200,${today});`;
        const insertRes= await db.sequelize.query(sql1,{type: QueryTypes.INSERT});
        console.log(insertRes);

        let sql2 = `SELECT max(cod_reserva) as cod_reserva FROM oma_lissi.reservas;`;
        const obtenerCodRes= await db.sequelize.query(sql2,{type: QueryTypes.SELECT});
        console.log(obtenerCodRes);

        console.log(req.body.desde);
        console.log(req.body.hasta);
        let sql3 = `INSERT INTO oma_lissi.reservas_tiene_cabañas VALUES (${obtenerCodRes[0].cod_reserva},1,${req.body.cantidadPersonas},'${req.body.desde}','${req.body.hasta}');`;
        const insertResCab= await db.sequelize.query(sql3,{type: QueryTypes.INSERT});
        console.log(insertResCab);

        
        
        res.render("reservaCreada",{usuarioLogeado: req.session.usuarioLogeado});//poner en la vista un resumen: Reserva creada con exito. Idreserva,fecha creacion,dni,nombre,apellido,telefono,email,ocupacion,desde,hasta,cantidad personas
    },
    listar: async function(req,res){
        let sql = `SELECT r.cod_reserva FROM oma_lissi.reservas as r LEFT JOIN oma_lissi.clientes as c on r.dni=c.dni WHERE c.mail = '${req.session.usuarioLogeado}';`;
        const listado= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
        console.log(listado);
        res.render("reservasListado",{listado:listado,usuarioLogeado: req.session.usuarioLogeado});
    },
    listarDetalles: async function(req,res){
        let sql = `SELECT DISTINCT r.cod_reserva,r.monto_total,r.monto_seña,r.fecha_creacion_reserva,sum(cant_personas) as cant_personas,rtc.fecha_entrada,rtc.fecha_salida
        FROM oma_lissi.reservas as r  
        LEFT JOIN oma_lissi.reservas_tiene_cabañas as rtc 
            on r.cod_reserva = rtc.cod_reserva 
        WHERE r.cod_reserva = ${req.params.id};`;
        const detalle= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
        console.log(detalle);
        res.render("reservasDetalle",{detalle:detalle,usuarioLogeado: req.session.usuarioLogeado});
    }
}

module.exports = reservasController;