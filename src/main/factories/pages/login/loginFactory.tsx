import React from 'react'

import { Login } from '@/presentation/pages'
import { makeRemoteAuthenticationFactory } from '../../usecases/authentication/remoteAuthenticationFactory'
import { makeLoginValidationFactory } from './loginValidationFactory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticationFactory()}
      validation={makeLoginValidationFactory()}
    />
  )
}
