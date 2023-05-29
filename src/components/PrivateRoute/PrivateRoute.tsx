import { Navigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ROUTES } from '../../utils/constants'
import { storeContext } from '../../store'

interface Props {
  children: JSX.Element,
}

export const PrivateRoute = ({ children }: Props) => {
  const store = useContext(storeContext)

  useEffect(() => {
    store.checkAuthorizationStatus()
  }, [store.token, store.id])

  return (
    store.authorizationStatus === 'fulfilled'
      ? children
      : <Navigate to={ROUTES.signIn} />
  )
}
