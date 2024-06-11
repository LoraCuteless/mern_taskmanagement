require('dotenv').config()

const express = require("express");
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout')
//express app
const app = express();

app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

app.use('/api/workout', workoutRoutes)

app.get('/', (req, res)=>{
    res.json({mssg: "Welcome to the App"})
})


//CONNECT TO DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen request
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listen port ", process.env.PORT);
        });
    })
    .catch((error)=>{
        console.log(error)
    })

process.env