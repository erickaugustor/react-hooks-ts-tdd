import React from 'react'

import { Login } from '@/presentation/pages'

import { makeRemoteAuthenticationFactory } from '../../usecases/authentication/remoteAuthenticationFactory'
import { makeLoginValidationFactory } from './loginValidationFactory'
import { makeLocalSaveAccessToken } from '../../usecases/saveAccessToken/LocalSaveAccessTokenFactory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticationFactory()}
      validation={makeLoginValidationFactory()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
