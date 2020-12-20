import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/HttpPostClient'
import { HttpResponse, HttpStatusCode } from '../protocols/http/HttpResponse'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  };

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body

    return Promise.resolve(this.response)
  }
}
