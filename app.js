const express = require('express');
const app = express();
app.set('view engine' , 'ejs');
app.set('views' , 'views');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path");
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

const expressSession=require('express-session');
const MongoDBSession=require('connect-mongodb-session')(expressSession);
const mdbsession = MongoDBSession({uri:"mongodb://localhost:27017/CarShop",collection:'sessions'});
app.use(expressSession({secret:'Makki',resave:false,saveUninitialized:false,store:mdbsession}));
const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);

const adminRouter = require("./routes/adminRouter");
app.use("/admin" , adminRouter);
const shopRouter = require("./routes/shopRouter");
app.use("/", shopRouter);


mongoose.connect("mongodb://localhost:27017/CarShop").then((result)=>{
        console.log("Connect successful to Carshop");
}).catch((result) => {
    console.log("Connection was not successful to Carshop");
});
app.listen(8080);