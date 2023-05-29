import { useContext, useEffect, useState } from 'react'
import { storeContext } from '../store'

export const useAuthorization = () => {
  const [authorizationStatus, setAuthorizationStatus] = useState<Status>('idle')
  const { id, token } = useContext(storeContext)

  useEffect(() => {
    if (id && token) {
      setAuthorizationStatus('fulfilled')
      return
    }

    setAuthorizationStatus('failed')
  }, [id, token])

  return { authorizationStatus, setAuthorizationStatus }
}
