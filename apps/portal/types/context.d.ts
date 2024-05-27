import { ServerContext } from 'remix-create-express-app/context'

declare module '@remix-run/node' {
  export interface AppLoadContext extends ServerContext {
    session: Session<SessionData, SessionFlashData>
  }
}

export {}
