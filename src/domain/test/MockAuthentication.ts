import faker from 'faker'
import { AuthenticationParams } from '../usecases/Authentication'

export const MockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
