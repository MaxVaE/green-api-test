import {
  KeyboardEvent, useContext, useEffect, useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Input } from '../Input'
import { ROUTES } from '../../utils/constants'
import { Button } from '../Button'
import { getStateInstanceQuery } from '../../api/queries'
import { storeContext } from '../../store'

export const Authorization = observer(() => {
  const [id, setId] = useState<string>('')
  const [idError, setIdError] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [tokenError, setTokenError] = useState<string>('')
  const [authorizationError, setAuthorizationError] = useState<string>('')

  const navigate = useNavigate()
  const store = useContext(storeContext)

  useEffect(() => {
    if (store.authorizationStatus === 'fulfilled') {
      navigate(ROUTES.home)
    }
  }, [store.authorizationStatus])

  const handleClick = async () => {
    const errorMessage = 'Заполните поле'

    try {
      store.authorizationStatus = 'pending'

      setIdError('')
      setTokenError('')

      if (!id) {
        setIdError(errorMessage)
        return
      }

      if (!token) {
        setTokenError(errorMessage)
        return
      }

      const { data } = await getStateInstanceQuery(id, token)

      if (data.stateInstance !== 'authorized') {
        setAuthorizationError(`Аккаунт: ${data.stateInstance}`)
        return
      }

      store.id = id
      store.token = token

      store.authorizationStatus = 'fulfilled'

      navigate(ROUTES.home)
    } catch (error) {
      store.authorizationStatus = 'failed'

      if (typeof error === 'string') {
        setAuthorizationError(error)
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      handleClick()
    }
  }

  return (
    <div className="authorization">
      <Input
        className="authorization__input"
        value={id}
        onChange={(value) => setId(value)}
        label="IdInstance:"
        placeholder="id"
        error={idError}
        onKeyDown={handleKeyDown}
      />

      <Input
        className="authorization__input"
        value={token}
        onChange={(value) => setToken(value)}
        label="ApiTokenInstance:"
        placeholder="token"
        error={tokenError}
        onKeyDown={handleKeyDown}
      />

      <Button onClick={handleClick} loading={store.authorizationStatus === 'pending'}>Вход</Button>
      <span className="authorization__error">{authorizationError}</span>
    </div>
  )
})
