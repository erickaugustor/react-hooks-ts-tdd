import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './styles.scss'

import Context from '@/presentation/context/form'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.emailError || state.passwordError) return

      setState({ ...state, isLoading: true })

      await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      })

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
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
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
