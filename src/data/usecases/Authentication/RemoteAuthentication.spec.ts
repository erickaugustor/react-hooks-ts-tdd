import faker from 'faker'

import { HttpPostClientSpy } from '../../test/MockHttpClient'
import { RemoteAuthentication } from './RemoteAuthentication'
import { MockAuthentication } from '../../../domain/test/MockAuthentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthetication', () => {
  test('should call HttpPostClient with correct URL', () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    sut.auth(MockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = MockAuthentication()
    sut.auth(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })
})
