const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    task_name:{
        type: String,
        required : true,

    }, 
    task_details:{
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('Tasks', taskSchema)
