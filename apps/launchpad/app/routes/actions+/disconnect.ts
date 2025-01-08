import { json } from '@remix-run/node'
import type { ActionFunctionArgs } from '@remix-run/node'

import { commitSession, getSession } from '../../lib/session'

export async function action({ request }: ActionFunctionArgs) {
  console.log('disconnect action called')

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const session = await getSession(request.headers.get('Cookie'))
    session.unset('wallet')
    console.log('Cleared session:', session.data)

    const cookie = await commitSession(session)
    console.log('Set-Cookie header:', cookie)

    return json(
      { success: true },
      {
        headers: {
          'Set-Cookie': cookie,
        },
      },
    )
  } catch (error) {
    console.error('Error in disconnect action:', error)
    return json({ error: 'Internal server error' }, { status: 500 })
  }
}
