import faker from 'faker'

import { HttpPostClient } from '@/data/protocols/http/HttpPostClient'
import { HttpPostClientSpy } from '../../test/MockHttpClient'
import { RemoteAuthentication } from './RemoteAuthentication'

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
    sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
