const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb+srv://saurabh:EvKJuuNxtsxWGxd0@cluster0.e8d2pel.mongodb.net/subscribers', { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=> console.log("connected to database"))

app.listen(3000, ()=>{
    console.log("server is started");
})