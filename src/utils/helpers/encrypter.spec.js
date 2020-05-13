const bcrypt = require('bcrypt')

class Encrypter {
  async compare (value, hash) {
    const isValid = bcrypt.compare(value, hash)
    return isValid
  }
}

describe('Encrypter', () => {
  test('Should return true if bcrypt return true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt return true', async () => {
    bcrypt.isValid = false
    const sut = new Encrypter()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
})
