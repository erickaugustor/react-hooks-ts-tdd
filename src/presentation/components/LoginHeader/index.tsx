import React, { memo } from 'react'

import styles from './styles.scss'

import Logo from '@/presentation/components/Logo'

type Props = React.HTMLAttributes<HTMLElement>

const LoginHeader: React.FC<Props> = (props: Props) => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
