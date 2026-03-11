const request = require('supertest');
const { app, server } = require('./src/index');

afterAll(() => server.close());

describe('GET /', () => {
  it('should return 200 with a message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/Hello/);
  });
});

describe('GET /health', () => {
  it('should return 200 with status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});
