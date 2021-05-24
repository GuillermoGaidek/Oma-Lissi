var db = require("../database/models");
var { QueryTypes } = require("sequelize");
var bcrypt = require("bcrypt")

let usuariosController = {
    registrar: function(req,res) {
        res.render("registrarUsuario",{usuarioLogeado: req.session.usuarioLogeado});
    },
    guardar: async function(req,res) {
        try{
            let today = new Date().toISOString().slice(0, 10) //fecha de hoy en formato SQL
            const password = bcrypt.hashSync(req.body.contraseña,10);

            let sql = `INSERT INTO oma_lissi.clientes (dni,nombre,apellido,telefono,mail,ocupacion,contraseña,fecha_creacion_cliente) VALUES ('${req.body.dni}','${req.body.nombre}','${req.body.apellido}','${req.body.telefono}','${req.body.email}','${req.body.ocupacion}','${password}','${today}');`;
            const registrarse= await db.sequelize.query(sql,{type: QueryTypes.INSERT});
            console.log(registrarse);
            req.session.usuarioLogeado = req.body.email;
            res.render("usuarioCreado",{usuarioLogeado: req.session.usuarioLogeado});
        }catch(err){
            res.render("registrarUsuario",{errors:[
                {msg: "El usuario ya existe"}
            ],
            usuarioLogeado: req.session.usuarioLogeado});
        }
    },
    login: function(req,res) {
        res.render("login",{usuarioLogeado: req.session.usuarioLogeado});
    },
    validarLogin: async function(req,res) {
        try{
            let sql = `SELECT mail,contraseña FROM oma_lissi.clientes WHERE mail='${req.body.email}';`;
            var credenciales= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
            if(credenciales.length == 0){
                throw "Usuario inválido";
            }
        }catch(err){
            res.render("login",{errors:[
                {msg: err}
            ],
            usuarioLogeado: req.session.usuarioLogeado});
        }
        
        let validacion = bcrypt.compareSync(req.body.contraseña,credenciales[0].contraseña);
        console.log(req.body.contraseña);
        console.log(bcrypt.hashSync(req.body.contraseña,10));
        console.log(credenciales[0].contraseña);
        console.log(validacion);

        if(validacion){
            req.session.usuarioLogeado = credenciales[0].mail;
            res.render("perfil",{usuarioLogeado: req.session.usuarioLogeado});
        }else{
            res.render("login",{errors:[
                {msg: "Contraseña inválida"}
            ],
            usuarioLogeado: req.session.usuarioLogeado});
        }
    },
    perfil: function(req,res){
        res.render("perfil",{usuarioLogeado: req.session.usuarioLogeado});
    },
    misDatos: async function(req,res){
        let sql = `SELECT dni,nombre,apellido,telefono,mail,ocupacion,cuenta_bancaria FROM oma_lissi.clientes WHERE mail='${req.session.usuarioLogeado}';`;
        const obtenerDatos= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
        console.log(obtenerDatos);
        res.render("misDatos",{usuarioLogeado: req.session.usuarioLogeado,datos: obtenerDatos});
    },
    salir: function(req,res){
        req.session.usuarioLogeado = undefined;
        res.redirect("/");
    }
}
module.exports = usuariosController;