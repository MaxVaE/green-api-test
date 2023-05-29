export const convertPhoneToChatId = (phone: string) => {
  let chatId = ''

  if (phone[0] === '+') {
    chatId = phone.slice(1)
  } else if (phone[0] === '8') {
    chatId = phone.replace('8', '7')
  } else {
    chatId = phone
  }

  return `${chatId}@c.us`
}
