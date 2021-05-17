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
            console.error(err);
            res.send("Hubo un error")
        }
    },
    login: function(req,res) {
        res.render("login",{usuarioLogeado: req.session.usuarioLogeado});
    },
    validarLogin: async function(req,res) {
        try{
            let sql = `SELECT mail,contraseña FROM oma_lissi.clientes WHERE mail='${req.body.email}';`;

            const credenciales= await db.sequelize.query(sql,{type: QueryTypes.SELECT});
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
                    {msg: "Credenciales inválidas"}
                ],
                usuarioLogeado: req.session.usuarioLogeado});
            }
        }catch(err){
            console.error(err);
            res.send("Hubo un error")
        }  
    },
    perfil: function(req,res){
        res.render("perfil",{usuarioLogeado: req.session.usuarioLogeado});
    }
}
module.exports = usuariosController;