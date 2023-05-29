type Status = 'idle' | 'pending' | 'fulfilled' | 'failed'

type StateInstance = 'notAuthorized' | 'authorized' | 'blocked' | 'sleepMode' | 'starting'

interface ContactInfo {
  avatar: string
  name: string
  lastSeen: string
  chatId: string
}

interface ReceiveNotification {
  receiptId: number
  body: {
    typeWebhook: 'incomingMessageReceived',
    instanceData: {
      idInstance: number,
      wid: string,
      typeInstance: 'whatsapp'
    },
    timestamp: number,
    idMessage: string,
    senderData: {
      chatId: string,
      sender: string,
      senderName: 'Green API'
    },
    messageData:{
      typeMessage: 'textMessage',
      textMessageData:{
        textMessage: string
      }
    }
  }
}

interface Message {
  idMessage: string
  timestamp: number
  textMessage: string
  authorId: string
}
