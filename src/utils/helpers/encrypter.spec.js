const bcrypt = require('bcrypt')

const makeSut = () => {
  class Encrypter {
    async compare (value, hash) {
      const isValid = await bcrypt.compare(value, hash)
      return isValid
    }
  }

  return new Encrypter()
}

describe('Encrypter', () => {
  test('Should return true if bcrypt return true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt return true', async () => {
    bcrypt.isValid = false
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'any_hash')

    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('any_hash')
  })
})
