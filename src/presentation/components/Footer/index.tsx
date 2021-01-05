import React, { memo } from 'react'

import styles from './styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Footer: React.FC<Props> = (props: Props) => {
  return (
    <footer className={styles.footer}>A</footer>
  )
}

export default memo(Footer)
