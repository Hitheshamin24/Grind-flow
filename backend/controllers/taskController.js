const task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "please login to create a task" });
    }
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "title is required" });
    }
    const newTask = await task.create({ user, title });
    res.status(201).json({ success: true, task: newTask });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "please login to view tasks" });
    }

    const tasks = await task.find({ user });
    // let tasksdetails = [];
    // for (let i = 0; i < tasks.length; i++) {
    //     const taskDetails={
    //         title:tasks[i].title,
    //         completed:tasks[i].completed,
    //         active:tasks[i].active
    //     }
    //     tasksdetails.push(taskDetails);
    // }
    res.status(200).json({ success: true, tasks: tasks });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.updateTask = async (req, res) => {
  const id = req.params.id;
  try {
    const taskDetails = await task.findByIdAndUpdate(id, req.body, {
     returnDocument: "after",
    });
    if (!taskDetails) {
      return res
        .status(404)
        .json({ success: false, message: "task not found" });
    }
    res.status(200).json({ success: true, task: taskDetails });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.completeTask = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "task id is required" });
    }
    const taskDetails = await task.findByIdAndUpdate(
      id,
      { completed: true, active: false },
      {
        returnDocument: "after",
      },
    );
    if (!taskDetails) {
      return res
        .status(404)
        .json({ success: false, message: "task not found" });
    }
    res.status(200).json({ success: true, task: taskDetails });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    try{
        if(!id){
            return res.status(400).json({success:false,message:"task id is required"})
        }
        const taskDetails= await task.findByIdAndDelete(id);
        if(!taskDetails){
            return res.status(404).json({success:false,message:"task not found"})
        }
        res.status(200).json({ success: true, message: "task deleted successfully" });
    }
    catch(e){
        res.status(500).json({ success: false, message: e.message });   
    }


}
