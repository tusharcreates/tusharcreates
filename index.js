const express=require('express');
const app=express();
const port=8000;
const routes=require('./routes');
const expressLayouts=require("express-ejs-layouts");
const db=require('./config/mongoose');
const bodyParser = require("body-parser");
const sassMiddleware = require("node-sass-middleware")
// const { cookie } = require('express/lib/response');
// const cookieParser=require('cookie-parser');

//used for session cookie
//encyption is done by the session (express session)
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');
//this is to store the data of our session into our db so that incase the server restarts the session is not ecpired for the user.
const MongoStore = require('connect-mongo');
app.use(express.static("./public"));

app.use(sassMiddleware(
    {
        src:'./public/scss',
        dest: './public/css',
        //put it false when in production
        debug: true,
        outputStyle:'extended',
        prefix:'/css'

    }));



app.use(expressLayouts);
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());


app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//this is the express session using the secret to encode the userid so that cookies are encypted.

app.use(session({
       name: 'soundshare',
       secret: '#Tushar4367',
       saveUninitialized: false,
       resave:false,
       cookie: {
           //life of a cookie (it is not a movie XD)
            maxAge:(100*60*1000)
       },
       //to store the session into the DB
       store: MongoStore.create(
           {
                mongoUrl: 'mongodb://localhost/personal_developement',
                autoRemove:'disabled'
           },
           (err)=>{
            console.log(err);
           }
       )
    }
   
));
// this is to intialize passport the order of .user session, initailze, session is very important.
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',routes);

app.listen(port,(err)=>{
    if(err){
        console.log(`There was an error connecting to port ${port}: ${err}`);
    }
    else{
        console.log(`The code is running on ${port}`);
    }
});

