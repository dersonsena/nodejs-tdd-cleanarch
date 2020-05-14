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

  test('Should enable CORS', async () => {
    app.get('/test-cors', (request, response) => {
      response.send('')
    })

    const response = await request(app).get('/test-cors')
    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
  })
})
