const Tasks = require("../models/taskModel")
const mongoose = require('mongoose')

// get all task
const getTasks = async(req, res)=>{
    const tasks = await Tasks.find({}).sort({createdAt: -1})

    res.status(200).json(tasks)
}

//get a single workouts
const getTask = async(req, res)=>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such task exist" });
    }

    const task = await Tasks.findById(id)

    if (!task){
        return res.status(404).json({error:'No such task exist'})
    }

    res.status(200).json(task)
}


//create workout
const createTask = async (req, res)=>{
    const { task_name, task_details, assigned_to } = req.body;

    let emptyFields = []

    if(!task_name){
      emptyFields.push('task_name')
    }

    if(!task_details){
      emptyFields.push('task_details')
    }

    if(!assigned_to){
      emptyFields.push('assigned_to')
    }
    if(emptyFields.length > 0){
      return res.status(400).json({error: "Please Fill in all the fields", emptyFields})
    }

    try {
      const task = await Tasks.create({ task_name, task_details, assigned_to });
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

//delete workout
const deleteTask = async(req, res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such task exist" });
    }

    const task = await Tasks.findOneAndDelete({_id: id})

    if (!task) {
      return res.status(404).json({ error: "No such task exist" });
    }

    res.status(200).json(task);
}
//update workout
const updateTask = async(req, res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such task exist" });
    }

    const task = await Tasks.findOneAndUpdate({ _id: id },{
        ...req.body
    });

    if (!task) {
      return res.status(404).json({ error: "No such task exist" });
    }

    res.status(200).json(task);
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}