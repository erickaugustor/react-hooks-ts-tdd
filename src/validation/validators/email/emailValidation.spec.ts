import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './emailValidation'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = makeSut()

    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return false if email is valid', () => {
    const sut = makeSut()

    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
