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
  FormStatus,
  SubmitButton
} from '@/presentation/components'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)
    
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return

      setState({ ...state, isLoading: true })

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      await saveAccessToken.save(account.accessToken)

      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />

          <SubmitButton text="Entrar" />

          <Link data-testid="signup" to="/signup" className={styles.link}>Criar conta</Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
