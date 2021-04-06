import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './styles.scss'

import Context from '@/presentation/context/form'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { SaveAccessToken } from '@/domain/usecases/SaveAccessToken'

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: '',
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation),
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={() => ({})}>
          <h2>Criar Conta</h2>

          <Input type="text" name="name" id="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="Repita sua senha" />

          <button
            data-testid="submit"
            type="submit"
            disabled={!!state.emailError || !!state.name || !!state.passwordConfirmation || !!state.passwordError}
            className={styles.submit}
          >
            Entrar
          </button>
          <Link data-testid="login" to="/login" className={styles.link}>Voltar para Login</Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
