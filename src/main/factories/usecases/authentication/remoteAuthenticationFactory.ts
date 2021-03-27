import { RemoteAuthentication } from '@/data/usecases/Authentication/RemoteAuthentication'
import { Authentication } from '@/domain/usecases'
import { makeApiURL } from '../../http/apiURLFactory'
import { makeAxiosHttpClientFactory } from '../../http/axiosHttpClientFactory'

export const makeRemoteAuthenticationFactory = (): Authentication => {
  return new RemoteAuthentication(makeApiURL('/login'), makeAxiosHttpClientFactory())
}
