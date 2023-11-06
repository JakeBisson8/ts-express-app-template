import request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app).get('/').expect(200, { message: 'Hello World!' }, done);
  });
});
