import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const MyMessage = ({ children }: Props) => (
  <>
    <div className="my-message__content">
      {children}
    </div>

    <svg
      viewBox="0 0 8 13"
      height="13"
      width="8"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 8 13"
      xmlSpace="preserve"
    >
      <path
        opacity="0.13"
        d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
      />
      <path
        fill="#d9fdd3"
        d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
      />
    </svg>
  </>
)
