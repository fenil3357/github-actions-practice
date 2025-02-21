const request = require('supertest');
const app = require('../src/app');
const TaskController = require('../src/controllers/taskController');

describe('Task API', () => {
  beforeEach(() => {
    TaskController.clearTasks();
  });

  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return all tasks', async () => {
      // Create a task first
      const taskData = {
        title: 'Test Task',
        description: 'Test Description'
      };
      await request(app).post('/api/tasks').send(taskData);

      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe(taskData.title);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description'
      };

      const res = await request(app)
        .post('/api/tasks')
        .send(taskData);

      expect(res.status).toBe(201);
      expect(res.body.title).toBe(taskData.title);
      expect(res.body.description).toBe(taskData.description);
      expect(res.body.completed).toBe(false);
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({});

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update an existing task', async () => {
      // Create a task first
      const createRes = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Original Title',
          description: 'Original Description'
        });

      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description',
        completed: true
      };

      const res = await request(app)
        .put(`/api/tasks/${createRes.body.id}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(updateData.title);
      expect(res.body.completed).toBe(updateData.completed);
    });

    it('should return 404 for non-existent task', async () => {
      const res = await request(app)
        .put('/api/tasks/999')
        .send({
          title: 'Updated Title',
          description: 'Updated Description'
        });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      // Create a task first
      const createRes = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Task to Delete',
          description: 'This task will be deleted'
        });

      const res = await request(app)
        .delete(`/api/tasks/${createRes.body.id}`);

      expect(res.status).toBe(204);

      // Verify task is deleted
      const getRes = await request(app).get(`/api/tasks/${createRes.body.id}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 for non-existent task', async () => {
      const res = await request(app).delete('/api/tasks/999');
      expect(res.status).toBe(404);
    });
  });
});