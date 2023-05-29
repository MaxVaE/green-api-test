import {
  KeyboardEvent, useContext, useEffect, useState,
} from 'react'
import { clsx } from 'clsx'
import { observer } from 'mobx-react-lite'
import { Avatar } from '../Avatar'
import { ButtonSend } from '../ButtonSend'
import { Message } from '../Message'
import { getMessageQuery, sendMessageQuery } from '../../api/queries'
import { MY_MESSAGE } from '../../utils/constants'
import { storeContext } from '../../store'
import { useLastMessageScroll } from '../../hooks/useBottomScroll'
import { Exit } from '../Exit'

interface Props {
  contactInfo: ContactInfo
}

export const Chat = observer(({ contactInfo }: Props) => {
  const [textMessage, setTextMessage] = useState<string>('')

  const store = useContext(storeContext)
  const lastMessageScroll = useLastMessageScroll({
    elementSelector: '.chat__message',
    scrollBySelector: '.chat__content',
    padding: 8,
  })

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const message = await getMessageQuery()

      if (!message) {
        return
      }

      store.addMessage(message)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    lastMessageScroll()
  }, [store.messages])

  const handleSend = async () => {
    if (!textMessage) {
      return
    }

    const { data } = await sendMessageQuery(
      contactInfo.chatId,
      textMessage,
    )

    store.addMessage(
      {
        textMessage,
        timestamp: new Date().getTime(),
        idMessage: data.idMessage,
        authorId: MY_MESSAGE,
      },
    )

    setTextMessage('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const checkNextAuthorId = (authorId: string, index: number) => !(store.messages.length - 1 === index || store.messages[index + 1].authorId === authorId)

  const handleExitChatRoom = () => {
    store.chatId = ''
    store.clearMessages()
  }

  return (
    <div className="chat">
      <header className="chat__header">
        <div className="chat-header__content">
          <div className="chat-header__avatar" title={contactInfo.name}>
            <Avatar avatar={contactInfo.avatar} />
          </div>

          <div className="chat-header__info">
            <span className="chat-header__name">{contactInfo.name || contactInfo.chatId}</span>
            <span className="chat-header__online">{contactInfo.lastSeen}</span>
          </div>
        </div>

        <Exit title="Покинуть чат" onExit={handleExitChatRoom} />
      </header>

      <div className="chat__wrapper">
        <div className="chat__content">
          {store.messages.map((message, index) => (
            <div
              key={message.idMessage}
              className={clsx(
                'chat__message',
                { 'chat__message--my-message': message.authorId === MY_MESSAGE },
                { 'chat__message--padding-bottom': checkNextAuthorId(message.authorId, index) },
              )}
            >
              <Message message={message} />
            </div>
          ))}
        </div>
      </div>

      <footer className="chat__footer">
        <textarea
          className="chat-footer__textarea"
          value={textMessage}
          onChange={(event) => setTextMessage(event.target.value)}
          placeholder="Введите сообщение"
          onKeyDown={handleKeyDown}
        />

        <ButtonSend title="Отправить соощение" onSend={handleSend} />
      </footer>
    </div>
  )
})
