const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../errors')

class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (id) {
    if (!this.secret) {
      throw new MissingParamError('secret')
    }
    return jwt.sign(id, this.secret)
  }
}

const makeSut = () => {
  return new TokenGenerator('secret')
}

describe('Token Generator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const accessToken = await sut.generate('any_id')
    expect(accessToken).toBeNull()
  })

  test('Should return a token if JWT returns a token', async () => {
    const sut = makeSut()
    const accessToken = await sut.generate('any_id')
    expect(accessToken).toBe(jwt.token)
  })

  test('Should throw if no secret is provided', async () => {
    const sut = new TokenGenerator()
    const promise = sut.generate('any_id')
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })
})
