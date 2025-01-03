const user = require("../models/users")

const getRegister = (req,res,next)=>{
    res.render("../views/auth/register.ejs" , {PageTitle : 'Registration' , isAuthenticated:req.session.isAuthenticated , isAdmin:req.session.isAdmin});
}

const postRegister = (req,res,next) =>{
    user_name = req.body.username;
    pass = req.body.pass;

    const new_user = new user({
        username:user_name,
        password:pass

    });

    new_user.save().then((result)=>{
        res.redirect("/auth/login");
    }).catch((result)=>{
        res.send("User has not registered successfully");
    })
    
}

const getLogin = (req,res,next)=>{
    res.render("../views/auth/login.ejs" , {PageTitle : 'Login Page' , isAuthenticated:req.session.isAuthenticated,isAdmin:req.session.isAdmin,invalid:false});
}

const postLogin = (req, res, next) => {
    user.findOne({ username: req.body.username, password: req.body.password })
        .then((result) => {
            if (result) {
                req.session.isAuthenticated = true;
                req.session.username = req.body.username;
                req.session.password = req.body.password;
                req.session.user_id = result._id;
                
                if (req.body.username === "admin" && req.body.password === "admin") {
                    req.session.isAdmin = true;
                } else {
                    req.session.isAdmin = false;
                }

                
                 res.redirect("/");
            } else {
                
                return res.render('auth/login', {
                    PageTitle: 'Login Page',
                    isAuthenticated: req.session.isAuthenticated,
                    isAdmin: req.session.isAdmin,
                    invalid: true
                });
            }
        })
};

const getLogout =(req,res,next) =>{
    req.session.destroy();
    res.redirect("/auth/login");
}

module.exports ={getRegister , postRegister , getLogin , postLogin , getLogout}