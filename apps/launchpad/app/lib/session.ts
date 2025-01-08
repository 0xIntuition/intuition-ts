import { createCookieSessionStorage } from '@remix-run/node'

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'launchpad_session',
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
      secrets: [process.env.SESSION_SECRET || 'SUPER_SECRET'],
      secure: process.env.NODE_ENV === 'production',
    },
  })

export { getSession, commitSession, destroySession }
