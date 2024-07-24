function auth(req, res, next){
    if(req.session.ad != undefined){
        next();
    }else{
        res.redirect("/logAdm");
    }
}

module.exports = auth;