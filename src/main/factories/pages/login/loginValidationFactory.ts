import { ValidationBuilder } from '@/validation/builder/validationBuilder'
import { ValidationComposite } from '@/validation/validators'

export const makeLoginValidationFactory = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
}
