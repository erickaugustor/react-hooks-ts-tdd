import { HttpPostClient } from '../../protocols/http/HttpPostClient'
import { AuthenticationParams } from '../../../domain/usecases/Authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}