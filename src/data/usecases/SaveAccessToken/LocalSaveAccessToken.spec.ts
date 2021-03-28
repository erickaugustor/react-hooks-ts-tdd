import faker from 'faker';

import { SetStorageMock } from '@/data/test/MockStorage';
import { LocalSaveAccessToken } from './LocalSaveAccressToken';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();

    const accessToken = faker.random.uuid();

    await sut.save(accessToken);

    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });

  test('should throw if setStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())

    const accessToken = faker.random.uuid();
    const promise = await sut.save(accessToken);

    await expect(promise).rejects.toThrow(new Error())
  });
});
