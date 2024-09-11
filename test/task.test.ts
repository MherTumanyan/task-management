process.env.NODE_ENV = 'test';
import request from 'supertest';
import { app, server } from '../server';
import mongoose from 'mongoose';

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Clean up the test database
  await mongoose.connection.close();
  server.close();
});

describe('Task API', () => {
  let taskId: string;

  beforeEach(async () => {
    const res = await request(app).post('/api/tasks').send({
      title: 'Test Task',
      description: 'Test Description',
      priority: 'High',
      assignedMember: 'John Doe',
    });
    taskId = res.body._id;
  });

  it('should create a new task', async () => {
    const res = await request(app).post('/api/tasks').send({
      title: 'Test Task',
      description: 'Test Description',
      priority: 'High',
      assignedMember: 'John Doe',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should return 400 for invalid task creation', async () => {
    const res = await request(app).post('/api/tasks').send({
      title: '', // Invalid title
      description: 'Test Description',
      priority: 'High',
      assignedMember: 'John Doe',
    });

    expect(res.status).toBe(400);
  });

  it('should update task status', async () => {
    const res = await request(app).patch(`/api/tasks/${taskId}/status`).send({
      status: 'completed',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'completed');
    expect(res.body).toHaveProperty('completedAt');
  });
});
