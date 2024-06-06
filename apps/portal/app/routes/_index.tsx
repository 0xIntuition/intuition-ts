import { SessionContext } from '@middleware/session'
import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

export async function loader({ context }: LoaderFunctionArgs) {
  const session = context.get(SessionContext)
  const error = session.get('error')
  return { error }
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
          <Link to="/restricted">Restricted (Geoblocked)</Link>
        </li>
        <li>
          <Link to="/app/test">Test</Link>
        </li>
      </ul>
    </div>
  )
}
