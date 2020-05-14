const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    app.get('/test-x-powered-by', (request, response) => {
      response.send('')
    })

    const response = await request(app).get('/test-x-powered-by')
    expect(response.headers['x-powered-by']).toBeUndefined()
  })
})
