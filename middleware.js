module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        console.log('login in first');
        req.flash('error',"login first")
        res.redirect('/login');
    }
    next();
}

module.exports.isAdmin=(req,res,next)=>{
    console.log(req);
    if(!req.isAuthenticated()){
       
            req.flash('error',"u are not admin");
            res.redirect('/login');
        
    }
    next();
}