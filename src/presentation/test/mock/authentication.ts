import { AccountModel } from '@/domain/models'
import { MockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

export default class AuthenticationSpy implements Authentication {
  account = MockAccountModel()
  params: AuthenticationParams
  callsCount = 0

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++

    return Promise.resolve(this.account)
  }
}
