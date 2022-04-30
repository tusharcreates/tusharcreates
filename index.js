const express=require('express');
const app=express();
const port=8000;
const routes=require('./routes');
const expressLayouts=require("express-ejs-layouts");
const db=require('./config/mongoose');
const bodyParser = require("body-parser");
const { cookie } = require('express/lib/response');
const cookieParser=require('cookie-parser');

app.use(expressLayouts);
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("./public"));

app.use('/',routes);

app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.listen(port,(err)=>{
    if(err){
        console.log(`There was an error connecting to port ${port}: ${err}`);
    }
    else{
        console.log(`The code is running on ${port}`);
    }
});

