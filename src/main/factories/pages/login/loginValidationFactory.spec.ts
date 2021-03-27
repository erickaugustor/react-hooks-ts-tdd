import { ValidationBuilder } from '@/validation/builder/validationBuilder'
import { ValidationComposite } from '@/validation/validators'
import { makeLoginValidationFactory } from './loginValidationFactory'

describe('LoginValidationFactory', () => {
  test('should compose Validation Composite with correct validations', () => {
    const composite = makeLoginValidationFactory()

    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
