import { Navigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

interface Props {
  children: JSX.Element,
  authorizationStatus: Status
}

export const PrivateRoute = ({ children, authorizationStatus }: Props) => (
  authorizationStatus === 'fulfilled'
    ? children
    : <Navigate to={ROUTES.signIn} />
)
