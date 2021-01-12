import React, { useContext } from 'react'

import styles from './styles.scss'

import Spinner from '@/presentation/components/Spinner'

import Context from '@/presentation/context/form'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const FormStatus: React.FC<Props> = (props: Props) => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {
        isLoading && (
          <Spinner
            className={styles.spinner}
          />
        )
      }

      {
        mainError && (
          <span
            data-testid="main-error"
            className={styles.error}
          >
            {mainError}
          </span>
        )
      }
    </div>
  )
}

export default FormStatus
