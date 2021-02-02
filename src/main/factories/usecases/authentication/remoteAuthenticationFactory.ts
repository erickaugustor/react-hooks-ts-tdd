import { RemoteAuthentication } from '@/data/usecases/Authentication/RemoteAuthentication'
import { Authentication } from '@/domain/usecases'
import { makeAxiosHttpClientFactory } from '../../http/axiosHttpClientFactory'

export const makeRemoteAuthenticationFactory = (): Authentication => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  return new RemoteAuthentication(url, makeAxiosHttpClientFactory())
}
