function logMiddle(req,res,next){
    if(req.session.usuarioLogeado != undefined){
        next();
    }else{
        res.render("logScreen");
    }
}

module.exports = logMiddle;