let tasks = [];

class TaskController {
  static getAllTasks(req, res) {
    res.json(tasks);
  }

  static getTaskById(req, res) {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  }

  static createTask(req, res) {
    const task = {
      id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description,
      completed: false,
      createdAt: new Date()
    };
    tasks.push(task);
    res.status(201).json(task);
  }

  static updateTask(req, res) {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    tasks[index] = {
      ...tasks[index],
      ...req.body,
      updatedAt: new Date()
    };
    
    res.json(tasks[index]);
  }

  static deleteTask(req, res) {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    tasks.splice(index, 1);
    res.status(204).send();
  }

  // For testing purposes
  static clearTasks() {
    tasks = [];
  }
}

module.exports = TaskController;