import React, { useState, useEffect } from 'react'
import styles from './styles.scss'

import Context from '@/presentation/context/form'
import { Validation } from '@/presentation/protocols/validation'

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email)
    })
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <div className={styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />

          <button
            data-testid="submit"
            type="submit"
            disabled
            className={styles.submit}
          >
            Entrar
          </button>
          <span className={styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
