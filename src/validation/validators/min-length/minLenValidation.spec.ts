import faker from 'faker'

import { MinLenValidation } from './minLenValidation'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (minLength: number): MinLenValidation => new MinLenValidation(faker.database.column(), minLength)

describe('MinLenValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = makeSut(5)

    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const sut = makeSut(5)

    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
