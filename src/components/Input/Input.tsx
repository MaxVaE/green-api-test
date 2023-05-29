import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  error?: string
  onChange: (value: string) => void
  label: string
}

export const Input = ({
  error, onChange, label, className, ...props
}: Props) => (
  <label className={clsx('label', className)}>
    {label}
    <input
      className="input"
      onChange={(event) => onChange(event.target.value)}
      {...props}
    />
    <span className="error">{error}</span>
  </label>
)
