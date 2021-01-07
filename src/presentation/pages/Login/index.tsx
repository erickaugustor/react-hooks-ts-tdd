import React, { useState } from 'react'
import styles from './styles.scss'

import Context from '@/presentation/context/form'

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <div className={styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, errorState }}>
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
