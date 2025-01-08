import { usePrivy } from '@privy-io/react-auth'
import { redirect } from '@remix-run/node'

import { getSession } from './session'

export async function requireWallet(request: Request) {
  console.log('Checking wallet requirement')
  const session = await getSession(request.headers.get('Cookie'))
  console.log('Session data:', session.data)

  if (!session.has('wallet')) {
    console.log('No wallet in session, redirecting to dashboard')
    throw redirect('/dashboard')
  }

  const wallet = session.get('wallet')
  console.log('Found wallet in session:', wallet)
  return { wallet }
}

export function useWalletRequired() {
  const { ready, authenticated, user } = usePrivy()

  if (!ready) {
    return { loading: true }
  }

  if (!authenticated || !user?.wallet) {
    throw redirect('/dashboard')
  }

  return { user }
}
