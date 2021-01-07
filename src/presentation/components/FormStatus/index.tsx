import React, { useContext } from 'react'

import styles from './styles.scss'

import Spinner from '@/presentation/components/Spinner'

import Context from '@/presentation/context/form'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const FormStatus: React.FC<Props> = (props: Props) => {
  const { state, errorState } = useContext(Context)
  const { isLoading } = state
  const { main } = errorState

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {
        isLoading && (
          <Spinner className={styles.spinner} />
        )
      }

      {
        main && (
          <span className={styles.error}>{main}</span>
        )
      }
    </div>
  )
}

export default FormStatus
