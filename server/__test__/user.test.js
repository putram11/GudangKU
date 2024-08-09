const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const userData = {
  email: 'ziady@mail.com',
  password: '12345',
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwdXRyYS5tYWhhcmRpa2EuMTdAZ21haWwuY29tIiwiaWF0IjoxNzIzMTY3NTgwfQ.VzHvq1NRsEFUinVoJzvIQRwzgofPeyGPuTltGGPM3HE';

beforeAll((done) => {
  request(app)
    .post('/adduser') 
    .set('Authorization', `Bearer ${accessToken}`) 
    .send(userData)
    .then((response) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe('User Routes Test', () => {
  describe('POST /login - user login', () => {
    test('200 Success login - should return access_token', (done) => {
      request(app)
        .post('/login')
        .send(userData)
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toHaveProperty('access_token', expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('401 Failed login - wrong password', (done) => {
      request(app)
        .post('/login')
        .send({ email: userData.email, password: 'wrongpassword' })
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Invalid email or password');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
