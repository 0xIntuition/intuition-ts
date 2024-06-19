import logger from '@lib/utils/logger'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function ProfileOverview() {
  const { message } = useLoaderData<typeof loader>()
  logger('message from profile overview loader', message)

  return (
    <div className="flex flex-col items-center gap-4">
      this is the profile overview
    </div>
  )
}
