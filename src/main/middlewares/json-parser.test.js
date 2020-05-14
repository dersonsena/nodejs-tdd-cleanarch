const request = require('supertest')
const app = require('../config/app')

describe('JSON Parser Middleware', () => {
  test('Should parse body as JSON', async () => {
    app.post('/test-json-parser', (req, response) => {
      response.send(req.body)
    })

    await request(app)
      .post('/test-json-parser')
      .send({ name: 'Kildim' })
      .expect({ name: 'Kildim' })
  })
})
