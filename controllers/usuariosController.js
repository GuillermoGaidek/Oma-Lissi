let db = require("../database/models");
const { QueryTypes } = require("sequelize");

let usuariosController = {
    registrar: function(req,res) {
        res.render("registrarUsuario",{usuarioLogeado: req.session.usuarioLogeado});
    },
    guardar: async function(req,res) {
        let today = new Date().toISOString().slice(0, 10) //fecha de hoy en formato SQL
        let sql = `INSERT INTO oma_lissi.clientes (dni,nombre,apellido,telefono,mail,ocupacion,contraseña,fecha_creacion_cliente) VALUES ('${req.body.dni}','${req.body.nombre}','${req.body.apellido}','${req.body.telefono}','${req.body.email}','${req.body.ocupacion}','${req.body.contraseña}','${today}');`;
        
        const registarse= await db.sequelize.query(sql,{type: QueryTypes.INSERT});//poner en estructura try catch

        res.render("usuarioCreado",{usuarioLogeado: req.session.usuarioLogeado});
    },
    login: function(req,res) {
        res.render("login",{usuarioLogeado: req.session.usuarioLogeado});
    },
    validarLogin: async function(req,res) {
        let sql = `SELECT mail,contraseña FROM oma_lissi.clientes WHERE mail='${req.body.email}' and contraseña = '${req.body.contraseña}';`;

        const ingreso= await db.sequelize.query(sql,{type: QueryTypes.SELECT});//poner en estructura try catch

        console.log(ingreso);

        if(ingreso.length == 1){
            req.session.usuarioLogeado = ingreso[0].mail;
            res.render("perfil",{usuarioLogeado: req.session.usuarioLogeado});
            console.log(req.session.usuarioLogeado);
        }else{
            res.render("login",{errors:[
                {msg: "Credenciales inválidas"}
            ],
            usuarioLogeado: req.session.usuarioLogeado});
        }  
    },
    perfil: function(req,res){
        res.render("perfil",{usuarioLogeado: req.session.usuarioLogeado});
    }
}
module.exports = usuariosController;