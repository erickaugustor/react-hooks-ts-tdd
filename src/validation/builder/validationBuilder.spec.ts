import { EmailValidation, MinLenValidation, RequiredFieldValidation } from '../validators'
import { ValidationBuilder } from './validationBuilder'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build()

    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('should return MinLenValidation', () => {
    const validations = ValidationBuilder.field('any_field').min(5).build()

    expect(validations).toEqual([new MinLenValidation('any_field', 5)])
  })

  test('should return list of validations', () => {
    const validations = ValidationBuilder.field('any_field').required().min(5).email().build()

    expect(validations).toEqual([
      new RequiredFieldValidation('any_field'),
      new MinLenValidation('any_field', 5),
      new EmailValidation('any_field')
    ])
  })
})
