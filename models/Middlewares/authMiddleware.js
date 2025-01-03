const authMiddleAuth = (req , res , next) =>{
    if(req.session.isAuthenticated == true){
        next();
    }
    else{
        res.redirect('/auth/login');
    }
}

const authMiddleisAdmin = (req , res , next) =>{
    if(req.session.isAdmin == true){
        next();
    }
    else{
        res.redirect('/auth/login');
    }
}
module.exports = {authMiddleAuth , authMiddleisAdmin}
