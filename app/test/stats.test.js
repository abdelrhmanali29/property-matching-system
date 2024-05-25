const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models');

describe('GET /stats', function () {
  let token;

  before(async function () {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = await User.create({
      name: 'Test User',
      phone: '1234567890',
      role: 'ADMIN',
      password: 'password123',
    });

    const res = await request(app).post('/v1/auth/login').send({
      phone: '1234567890',
      password: 'password123',
    });

    token = res.body.accessToken;
  });

  after(async function () {
    await User.deleteOne({ phone: '1234567890' });
    await mongoose.disconnect();
  });

  it('should get stats with valid token', async function () {
    const res = await request(app)
      .get('/v1/stats')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    assert.strictEqual(Array.isArray(res.body.data), true);
    assert.strictEqual(typeof res.body.page, 'number');
    assert.strictEqual(typeof res.body.limit, 'number');
    assert.strictEqual(typeof res.body.total, 'number');
    assert.strictEqual(typeof res.body.totalPages, 'number');
    assert.strictEqual(typeof res.body.hasNextPage, 'boolean');
    assert.strictEqual(typeof res.body.hasPreviousPage, 'boolean');
  });

  it('should return 401 for request without token', async function () {
    await request(app).get('/v1/stats').expect(401);
  });
});
