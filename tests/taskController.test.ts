import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Task from '../src/models/Task';

// auth middlware mock
jest.mock('../src/middlewares/authMiddleware', () => require('../src/middlewares/__mocks__/authMiddleware'));

describe('Task API', () => {
  beforeAll(async () => {
    // connect to testing db
    const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(dbUri);
  });

  beforeEach(async () => {
    // clean the db before each test
    await Task.deleteMany({});
    await Task.create([
      { title: 'Task 1', completed: false, userId: 'auth0|test_user' },
      { title: 'Task 2', completed: true, userId: 'auth0|test_user' },
    ]);
  });

  afterEach(async () => {
    // clean the db after each test
    await Task.deleteMany({});
  });

  afterAll(async () => {
    // close the conn with the db after tests ended
    await mongoose.connection.close();
  });

  it('should fetch tasks for the authenticated user', async () => {
    const mockAccessToken = 'test_access_token';

    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${mockAccessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2); // Debe devolver las dos tareas
    expect(response.body[0]).toHaveProperty('title', 'Task 1');
    expect(response.body[1]).toHaveProperty('title', 'Task 2');
  });

  it('should create a new task', async () => {
    const mockAccessToken = 'test_access_token';

    const newTask = { title: 'New Task' };

    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${mockAccessToken}`)
      .send(newTask);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'New Task');
    expect(response.body).toHaveProperty('completed', false);

    const tasks = await Task.find({ userId: 'auth0|test_user' });
    expect(tasks.length).toBe(3); // should be now 3 tasks after creating one
  });

  it('should update a task status', async () => {
    const mockAccessToken = 'test_access_token';

    const task = await Task.findOne({ title: 'Task 1' });

    const response = await request(app)
      .patch(`/api/tasks/${task?._id}`)
      .set('Authorization', `Bearer ${mockAccessToken}`)
      .send({ completed: true });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('completed', true);

    const updatedTask = await Task.findById(task?._id);
    expect(updatedTask?.completed).toBe(true);
  });

  it('should delete a task', async () => {
    const mockAccessToken = 'test_access_token';

    const task = await Task.findOne({ title: 'Task 1' });

    const response = await request(app)
      .delete(`/api/tasks/${task?._id}`)
      .set('Authorization', `Bearer ${mockAccessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Task deleted successfully');

    const tasks = await Task.find({ userId: 'auth0|test_user' });
    expect(tasks.length).toBe(1); // only 1 task should be remaining
  });

//   it('should return 404 for a task not found', async () => {
//     jest.setTimeout(10000); // Aumenta el timeout a 10 segundos
  
//     const mockAccessToken = 'test_access_token';
//     const nonExistentId = new mongoose.Types.ObjectId();
  
//     const response = await request(app)
//       .delete(`/api/tasks/${nonExistentId}`)
//       .set('Authorization', `Bearer ${mockAccessToken}`);
  
//     expect(response.status).toBe(404);
//     expect(response.body).toHaveProperty('message', 'Task not found or unauthorized');
//   });
});
