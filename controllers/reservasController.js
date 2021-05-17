var db = require("../database/models");
var { QueryTypes } = require("sequelize");
var bcrypt = require("bcrypt")

let reservasController = {
    mostrar: function(req,res) {
        res.render("crearReservas",{usuarioLogeado: req.session.usuarioLogeado});
    },
    guardar: async function(req,res) {
        try{
            let desde = new Date(req.body.desde);
            let hasta = new Date(req.body.hasta);
            let diasReservados = (hasta - desde) / 86400000;
            let montoTotal = diasReservados * 3000;
            let montoSeña = montoTotal * 0.20;
            let today = new Date().toISOString().slice(0, 10)
            console.log(diasReservados);
            console.log(montoTotal);
            console.log(montoSeña);

            let sql0 = `SELECT dni FROM oma_lissi.clientes WHERE mail='${req.session.usuarioLogeado}';`;
            const obtenerDni= await db.sequelize.query(sql0,{type: QueryTypes.SELECT});
            console.log(obtenerDni);
            
            let sql1 = `INSERT INTO oma_lissi.reservas (dni,monto_total,monto_seña,fecha_creacion_reserva) VALUES (${obtenerDni[0].dni},${montoTotal},${montoSeña},'${today}');`;
            const insertRes= await db.sequelize.query(sql1,{type: QueryTypes.INSERT});
            console.log(insertRes);

            let sql2 = `SELECT max(cod_reserva) as cod_reserva FROM oma_lissi.reservas;`;
            const obtenerCodRes= await db.sequelize.query(sql2,{type: QueryTypes.SELECT});
            console.log(obtenerCodRes);

            let sql3 = `INSERT INTO oma_lissi.reservas_tiene_cabañas VALUES (${obtenerCodRes[0].cod_reserva},1,${req.body.cantidadPersonas},'${req.body.desde}','${req.body.hasta}');`;
            const insertResCab= await db.sequelize.query(sql3,{type: QueryTypes.INSERT});
            console.log(insertResCab);
            req.session.justCreated = true;
            
            res.redirect(`/reservas/listado/${obtenerCodRes[0].cod_reserva}`);
        }catch(err){
            console.error(err);
            res.send("Hubo un error")
        }
    },
    listar: async function(req,res){
        try{
            let sql = `SELECT r.cod_reserva FROM oma_lissi.reservas as r LEFT JOIN oma_lissi.clientes as c on r.dni=c.dni WHERE c.mail = '${req.session.usuarioLogeado}';`;
            const listado= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
            console.log(listado);
            res.render("reservasListado",{listado:listado,usuarioLogeado: req.session.usuarioLogeado});
        }catch(err){
            console.error(err);
            res.send("Hubo un error")
        }
    },
    listarDetalles: async function(req,res){
        try{
            let sql = `SELECT DISTINCT r.cod_reserva,r.monto_total,r.monto_seña,r.fecha_creacion_reserva,sum(cant_personas) as cant_personas,rtc.fecha_entrada,rtc.fecha_salida
            FROM oma_lissi.reservas as r  
            LEFT JOIN oma_lissi.reservas_tiene_cabañas as rtc 
                on r.cod_reserva = rtc.cod_reserva 
            WHERE r.cod_reserva = ${req.params.id};`;
            const detalle= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
            console.log(detalle);
            
            let justCreated = req.session.justCreated;
            req.session.justCreated = false;

            let justModified = req.session.justModified;
            req.session.justModified = false;

            res.render("reservasDetalle",{detalle:detalle,usuarioLogeado: req.session.usuarioLogeado, justCreated: justCreated,justModified: justModified});
        }catch(err){
            console.error(err);
            res.send("Hubo un error")
        }
    },
    modificar: async function(req,res){
        try{
            let sql = `SELECT DISTINCT r.cod_reserva,r.monto_total,r.monto_seña,r.fecha_creacion_reserva,sum(cant_personas) as cant_personas,rtc.fecha_entrada,rtc.fecha_salida
            FROM oma_lissi.reservas as r  
            LEFT JOIN oma_lissi.reservas_tiene_cabañas as rtc 
                on r.cod_reserva = rtc.cod_reserva 
            WHERE r.cod_reserva = ${req.params.id};`;
            const detalle= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
            console.log(detalle);
            
            res.render("modificarReserva",{detalle:detalle,usuarioLogeado: req.session.usuarioLogeado});
        }catch(err){
                console.error(err);
                res.send("Hubo un error")
        }
    },
    guardarModificacion: async function(req,res) {
        try{
            let desde = new Date(req.body.desde);
            let hasta = new Date(req.body.hasta);
            let diasReservados = (hasta - desde) / 86400000;
            let montoTotal = diasReservados * 3000;
            let montoSeña = montoTotal * 0.20;
            console.log(diasReservados);
            console.log(montoTotal);
            console.log(montoSeña);

            let sql1 = `UPDATE oma_lissi.reservas SET monto_total = ${montoTotal},monto_seña = ${montoSeña} WHERE cod_reserva = ${req.params.id};`;
            const updateRes= await db.sequelize.query(sql1,{type: QueryTypes.UPDATE});
            console.log(updateRes);

            let sql2 = `UPDATE oma_lissi.reservas_tiene_cabañas SET cant_personas = ${req.body.cantidadPersonas},fecha_entrada = '${req.body.desde}',fecha_salida = '${req.body.hasta}' WHERE cod_reserva = ${req.params.id};`;
            const updateResCab= await db.sequelize.query(sql2,{type: QueryTypes.UPDATE});
            console.log(updateResCab);
            
            req.session.justModified = true;
            
            res.redirect(`/reservas/listado/${req.params.id}`);
        }catch(err){
            console.error(err);
            res.send("Hubo un error")
        }
    },
    borrar: async function(req,res) {
        try{
            let sql1 = `DELETE FROM oma_lissi.reservas_tiene_cabañas WHERE cod_reserva = ${req.params.id};`;
            const deleteRes1 = await db.sequelize.query(sql1,{type: QueryTypes.DELETE});
            console.log(deleteRes1);
            
            let sql2 = `DELETE FROM oma_lissi.reservas WHERE cod_reserva = ${req.params.id};`;
            const deleteRes2 = await db.sequelize.query(sql2,{type: QueryTypes.DELETE});
            console.log(deleteRes2);

            res.render("borrarReserva",{usuarioLogeado: req.session.usuarioLogeado,codRes:req.params.id});
        }catch(err){
            console.error(err);
            res.send("Hubo un error")
        }
    }
}

module.exports = reservasController;