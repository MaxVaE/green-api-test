import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export const Button = ({
  children, onClick: handleClick, loading, className, ...props
}: Props) => (
  <button
    className={clsx('button', className)}
    type="button"
    onClick={handleClick}
    disabled={loading}
    {...props}
  >
    {
      loading
        ? 'Загрузка...'
        : children
    }
  </button>
)
