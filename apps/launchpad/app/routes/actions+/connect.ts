import { json } from '@remix-run/node'
import type { ActionFunctionArgs } from '@remix-run/node'

import { commitSession, getSession } from '../../lib/session'

export async function action({ request }: ActionFunctionArgs) {
  console.log('connect action called')

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const session = await getSession(request.headers.get('Cookie'))
    console.log('Current session:', session.data)

    const { wallet } = await request.json()
    console.log('Setting wallet:', wallet)

    if (!wallet) {
      console.error('No wallet provided')
      return json({ error: 'Wallet address is required' }, { status: 400 })
    }

    session.set('wallet', wallet)
    console.log('Updated session:', session.data)

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
    console.error('Error in connect action:', error)
    return json({ error: 'Internal server error' }, { status: 500 })
  }
}
