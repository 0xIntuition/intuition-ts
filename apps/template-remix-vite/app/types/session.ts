import { SessionUser } from './user'

declare global {
  type SessionData = {
    count: number
    user?: SessionUser
  }

  type SessionFlashData = {
    error: string
  }
}

export {}
