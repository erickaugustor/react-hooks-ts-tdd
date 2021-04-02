import faker from 'faker'

import { HttpPostClientSpy } from '@/data/test'
import { MockAddAccountParams } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

import { RemoteAddAccount } from './RemoteAddAccount'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(MockAddAccountParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = MockAddAccountParams()
    await sut.add(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('should throw EmailInUseWrror if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.add(MockAddAccountParams())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }

    const promise = sut.add(MockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw unexpected error if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.add(MockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw unexpected error if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.add(MockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AccountModel if HttpPostCLient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const httpResult = MockAddAccountParams()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.add(MockAddAccountParams())
    expect(account).toEqual(httpResult)
  })
})
