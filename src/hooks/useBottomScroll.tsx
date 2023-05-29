interface Args {
  elementSelector: string
  padding?: number
  scrollBySelector?: string
}

export const useLastMessageScroll = ({ elementSelector, padding = 0, scrollBySelector }: Args) => () => {
  const element = document.querySelectorAll(elementSelector)

  if (!element.length) {
    return
  }

  element[element.length - 1].scrollIntoView(false)

  if (!scrollBySelector) {
    return
  }

  document.querySelector(scrollBySelector)?.scrollBy(0, padding)
}
