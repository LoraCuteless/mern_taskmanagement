require('dotenv').config()

const express = require("express");
const workoutRoutes = require('/routes')
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


//listen request
app.listen(process.env.PORT, () => {
    console.log("listen port ", process.env.PORT);
})

process.env