const {
    createTask,getTasks,updateTask,completeTask,deleteTask
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();


router.post("/create-task",authMiddleware,createTask);
router.get("/get-tasks",authMiddleware,getTasks);
router.put("/update-task/:id",authMiddleware,updateTask);
router.put("/complete-task/:id",authMiddleware,completeTask);
router.delete("/delete-task/:id",authMiddleware,deleteTask);


module.exports = router;