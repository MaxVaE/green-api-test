import { MY_MESSAGE } from '../../utils/constants'
import { InterlocutorMessage } from './InterlocutorMessage'
import { MyMessage } from './MyMessage'
import { getTime } from '../../utils/getTime'

interface Props {
  message: Message
}

export const Message = ({ message }: Props) => {
  const { textMessage, timestamp, authorId } = message

  const MessageComponent = (
    <>
      <span className="message__text">
        {textMessage}
      </span>
      <div className="message__time-content">
        <span className="message__time">
          {getTime(timestamp)}
        </span>
      </div>
    </>
  )

  return (
    <div className="message">
      {
        authorId === MY_MESSAGE
          ? <MyMessage>{MessageComponent}</MyMessage>
          : <InterlocutorMessage>{MessageComponent}</InterlocutorMessage>
      }
    </div>
  )
}
