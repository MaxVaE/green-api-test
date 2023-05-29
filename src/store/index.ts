import { createContext } from 'react'
import { makeAutoObservable } from 'mobx'
import {
  getChatIdLS, getIdLS, getTokenLS, setChatIdLS, setIdLS, setTokenLS,
} from '../utils/localStorage'

export class Store {
  private _id = getIdLS() ?? ''

  private _token = getTokenLS() ?? ''

  private _chatId = getChatIdLS() ?? ''

  private _messages: Message[] = []

  constructor() {
    makeAutoObservable(this)
  }

  public get id() {
    return this._id
  }

  public set id(id: string) {
    setIdLS(id)
    this._id = id
  }

  public get token() {
    return this._token
  }

  public set token(token: string) {
    setTokenLS(token)
    this._token = token
  }

  public get chatId() {
    return this._chatId
  }

  public set chatId(chatId: string) {
    setChatIdLS(chatId)
    this._chatId = chatId
  }

  public get messages() {
    return this._messages
  }

  public clearMessages() {
    this._messages = []
  }

  public addMessage(message: Message) {
    this._messages = [
      ...this._messages,
      message,
    ]
  }
}

export const storeContext = createContext<Store>(new Store())
