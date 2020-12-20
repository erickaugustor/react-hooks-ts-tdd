import axios from 'axios'

import { mockAxios } from '@/infra/test'
import { mockPostRequest } from '@/data/test'

import { AxiosHttpClient } from './AxiosHttpClient'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()

    const promise = sut.post(mockPostRequest())

    await expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
