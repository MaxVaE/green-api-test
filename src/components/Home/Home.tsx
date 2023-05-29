import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Chat } from '../Chat'
import { CreateChat } from '../CreateChat'
import { getContactInfoQuery } from '../../api/queries'
import { storeContext } from '../../store'

export const Home = observer(() => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | undefined>()

  const store = useContext(storeContext)

  const getContactInfo = async () => {
    const { chatId } = store

    if (!chatId) {
      setContactInfo(undefined)
      return
    }

    const { data } = await getContactInfoQuery(chatId)

    setContactInfo(data)
  }

  useEffect(() => {
    getContactInfo()
  }, [store.chatId])

  return (
    <div className="home">
      <div className="home__content">
        {
          !contactInfo
            ? <CreateChat />
            : <Chat contactInfo={contactInfo} />
        }
      </div>
    </div>
  )
})
