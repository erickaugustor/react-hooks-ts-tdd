import { AxiosHttpClient } from '@/infra/http/axios-http-client/AxiosHttpClient'

export const makeAxiosHttpClientFactory = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
