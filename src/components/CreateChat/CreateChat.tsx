import { KeyboardEvent, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import { Input } from '../Input'
import { convertPhoneToChatId } from '../../utils/getChatId'
import { storeContext } from '../../store'
import { Exit } from '../Exit'
import { ROUTES } from '../../utils/constants'

export const CreateChat = observer(() => {
  const [phone, setPhone] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string>('')

  const store = useContext(storeContext)
  const navigation = useNavigate()

  const handleCreateChat = () => {
    setPhoneError('')

    if (!phone) {
      setPhoneError('Заполните поле')
      return
    }

    if (phone.length < 11) {
      setPhoneError('В номере должно быть не меньше 11 цифр')
      return
    }

    store.chatId = convertPhoneToChatId(phone)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      handleCreateChat()
    }
  }

  const handleExitChatRoom = () => {
    store.id = ''
    store.token = ''

    store.checkAuthorizationStatus()

    navigation(ROUTES.signIn)
  }

  return (
    <div className="create-chat">
      <div className="create-chat__exit">
        <Exit title="Выйти из аккаунта" onExit={handleExitChatRoom} />
      </div>

      <Input
        className="create-chat__phone"
        label="Номер пользователя:"
        placeholder="номер"
        value={phone}
        onChange={(value) => setPhone(value)}
        error={phoneError}
        onKeyDown={handleKeyDown}
      />

      <Button onClick={handleCreateChat}>Создать чат</Button>
    </div>
  )
})
