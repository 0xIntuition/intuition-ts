import logger from '@lib/utils/logger'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return redirect('/app/explore/users')
}

export default function ExploreClaims() {
  const { message } = useLoaderData<typeof loader>()
  logger('message from profile overview loader', message)

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">Explore Index Route</div>
      <pre>THIS IS A TEST</pre>
      <pre>This is a placeholder for the Explore Index route</pre>
      <pre>route loader: {message}</pre>
    </div>
  )
}
