import { ApiRoutes } from './apiRoutes'
import { client } from './client'

export const getStateInstanceQuery = (id: string, token: string) => client.get<{ stateInstance: StateInstance }>(ApiRoutes.getStateInstance(id, token))

export const getContactInfoQuery = (chatId: string) => client.post<ContactInfo>(ApiRoutes.getContactInfo, {
  chatId,
})

export const receiveNotificationQuery = () => client.get<ReceiveNotification | null>(ApiRoutes.receiveNotification)

export const deleteNotificationQuery = (receiptId: number) => client.delete<{ result: boolean }>(ApiRoutes.deleteNotification(receiptId))

export const sendMessageQuery = (chatId: string, message: string) => client.post<{ idMessage: string }>(ApiRoutes.sendMessage, {
  chatId,
  message,
})

export const getMessageQuery = async (): Promise<Message | null> => {
  const { data } = await receiveNotificationQuery()

  if (!data || !data.receiptId) {
    return null
  }

  const { receiptId, body } = data
  const {
    typeWebhook,
    messageData,
    timestamp,
    idMessage,
    senderData,
  } = body

  const deleteNotification = await deleteNotificationQuery(receiptId)

  if (typeWebhook !== 'incomingMessageReceived' || messageData.typeMessage !== 'textMessage' || !deleteNotification.data.result) {
    return null
  }

  return {
    textMessage: messageData.textMessageData.textMessage,
    timestamp,
    idMessage,
    authorId: senderData.sender,
  }
}
