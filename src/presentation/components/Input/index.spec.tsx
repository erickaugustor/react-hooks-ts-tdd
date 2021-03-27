import React from 'react'
import faker from 'faker'

import { fireEvent, render, RenderResult } from '@testing-library/react'
import Input from './index'

import Context from '@/presentation/context/form/index'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />7
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const fieldName = faker.database.column()
    const { getByTestId } = makeSut(fieldName)

    const input = getByTestId(fieldName) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })

  test('should remove readOnly on focus', () => {
    const fieldName = faker.database.column()
    const { getByTestId } = makeSut(fieldName)

    const input = getByTestId(fieldName) as HTMLInputElement
    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })
})
