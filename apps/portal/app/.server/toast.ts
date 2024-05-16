/**
 * This module is responsible for managing toast notifications in the application.
 * It includes definitions for the toast schema, utility functions for creating and
 * retrieving server-created toast messages from session, and handling toast messages during
 * server-side redirects.
 */

import { combineHeaders } from '@lib/utils/misc'
import { createId as cuid } from '@paralleldrive/cuid2'
import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { z } from 'zod'

export const toastKey = 'toast'

const TypeSchema = z.enum(['message', 'success', 'error'])

const ToastSchema = z.object({
  description: z.string(),
  id: z.string().default(() => cuid()),
  title: z.string().optional(),
  type: TypeSchema.default('message'),
})

export type Toast = z.infer<typeof ToastSchema>
export type OptionalToast = Omit<Toast, 'id' | 'type'> & {
  id?: string
  type?: z.infer<typeof TypeSchema>
}

export const toastSessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'en_toast',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: ['SUPER_SECRET'],
    secure: process.env.NODE_ENV === 'production',
  },
})

/**
 * Creates a server-side redirect response that includes a toast message
 */
export const redirectWithToast = async (
  url: string,
  toast: OptionalToast,
  init?: ResponseInit,
) => {
  const toastHeaders = await createToastHeaders(toast)

  return redirect(url, {
    ...init,
    headers: combineHeaders(init?.headers, toastHeaders),
  })
}

/**
 * Generates HTTP headers with the toast message set in the session cookie.
 * This will trigger a toast from the server to the client
 *
 * Basic usage in server actions:
 *
 * export const action = async () => {
 *   const headers = await createToastHeaders({
 *     type: 'success',
 *     title: 'Your toast title',
 *     description: 'Your toast description',
 *   })
 *
 *   return json({ ...yourResponse }, { headers })
 * }
 *
 */
export const createToastHeaders = async (optionalToast: OptionalToast) => {
  const session = await toastSessionStorage.getSession()
  const toast = ToastSchema.parse(optionalToast)
  // using session.flash so next time .get is called, it's immediately removed
  session.flash(toastKey, toast)
  const cookie = await toastSessionStorage.commitSession(session)

  return new Headers({ 'set-cookie': cookie })
}

/**
 * Retrieves the toast message from the request's session cookie
 */
export const getToast = async (request: Request) => {
  const cookie = request.headers.get('cookie')
  const session = await toastSessionStorage.getSession(cookie)
  const result = ToastSchema.safeParse(session.get(toastKey))
  const toast = result.success ? result.data : null
  const headers = !toast
    ? null
    : new Headers({
        'set-cookie': await toastSessionStorage.commitSession(session),
      })

  return {
    toast,
    headers,
  }
}
