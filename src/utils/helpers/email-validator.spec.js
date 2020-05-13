const EmailValidator = require('./email-validator')
const validator = require('validator')
const { MissingParamError } = require('../errors')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBeTruthy()
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    validator.isEmailValid = false
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBeFalsy()
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('any_email@email.com')
    expect(validator.email).toBe('any_email@email.com')
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    expect(sut.isValid).toThrow(new MissingParamError('email'))
  })
})
