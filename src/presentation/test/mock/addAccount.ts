import { AccountModel } from '@/domain/models'
import { MockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export default class AddAccountSpy implements AddAccount {
  account = MockAccountModel()
  params: AddAccountParams
  callsCount = 0

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++

    return this.account
  }
}
