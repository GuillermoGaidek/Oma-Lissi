function notLogMiddle(req,res,next){
    if(req.session.usuarioLogeado == undefined){
        next();
    }else{
        res.send("mostrar perfil con CRUD");
    }
}

module.exports = notLogMiddle;