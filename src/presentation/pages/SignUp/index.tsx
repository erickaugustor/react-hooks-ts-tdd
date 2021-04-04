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
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  return (
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state: {} }}>
        <form data-testid="form" className={styles.form} onSubmit={() => ({})}>
          <h2>Criar Conta</h2>

          <Input type="text" name="name" id="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />

          <button
            data-testid="submit"
            type="submit"
            disabled={!!state.emailError || !!state.passwordError}
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
