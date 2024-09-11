process.env.NODE_ENV = 'test';
import request from 'supertest';
import { app, server } from '../server';
import mongoose from 'mongoose';

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Clean up the test database
  await mongoose.connection.close();
  server.close();
});

describe('Report API', () => {
  it('should generate a report', async () => {
    const res = await request(app)
      .get('/api/report')
      .query({ timePeriod: 'week' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalTasks');
    expect(res.body).toHaveProperty('averageCompletionTime');
  });
});
