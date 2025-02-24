import { type ActionFunctionArgs } from '@remix-run/node'

import { createSession, getSession } from '../.server/session'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request)

  // Create new session with only wallet info preserved
  return createSession(
    {
      discordUser: null,
      walletAuth: session.walletAuth, // Preserve wallet info
    },
    '/login',
  )
}
