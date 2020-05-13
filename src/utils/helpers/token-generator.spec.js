const jwt = require('jsonwebtoken')

class TokenGenerator {
  async generate (id) {
    return jwt.sign(id, 'secret')
  }
}

describe('Token Generator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = new TokenGenerator()
    jwt.token = null
    const accessToken = await sut.generate('any_id')
    expect(accessToken).toBeNull()
  })

  test('Should return a token if JWT returns a token', async () => {
    const sut = new TokenGenerator()
    const accessToken = await sut.generate('any_id')
    expect(accessToken).toBe(jwt.token)
  })
})
