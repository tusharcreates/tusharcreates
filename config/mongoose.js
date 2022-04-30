const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/personal_developement');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to MongoDB"));

db.once('open', ()=>{
    console.log("Sucessfully Connected to DB");
})

module.exports=db;