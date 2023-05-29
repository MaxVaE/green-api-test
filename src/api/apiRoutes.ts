import { getIdLS, getTokenLS } from '../utils/localStorage'

const currentId = getIdLS()
const currentToken = getTokenLS()

export const ApiRoutes = {
  getStateInstance: (id: string, token: string) => `/waInstance${id}/getStateInstance/${token}`,
  getContactInfo: `/waInstance${currentId}/getContactInfo/${currentToken}`,
  sendMessage: `/waInstance${currentId}/sendMessage/${currentToken}`,
  receiveNotification: `/waInstance${currentId}/receiveNotification/${currentToken}`,
  deleteNotification: (receiptId: number) => `/waInstance${currentId}/deleteNotification/${currentToken}/${receiptId}`,
}
