const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const { validateTask } = require('../middleware/validation');

router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', validateTask, TaskController.createTask);
router.put('/:id', validateTask, TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;