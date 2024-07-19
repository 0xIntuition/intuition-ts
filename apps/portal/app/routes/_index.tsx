import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { setupAPI } from '@server/auth'
import { onboardingModalCookie } from '@server/onboarding'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = await onboardingModalCookie.parse(cookieHeader)

  setupAPI(request)

  if (!cookie) {
    return redirect('/intro')
  }

  return redirect('/login')
}

export default function Index() {
  const { error } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Intuition</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/app">App</Link>
        </li>
        <li>
          <Link to="/app/profile">Profile</Link>
        </li>
        <li>
          <Link to="/restricted">Restricted (Geoblocked)</Link>
        </li>
        <li>
          <Link to="/app/test">Test</Link>
        </li>
      </ul>
    </div>
  )
}
