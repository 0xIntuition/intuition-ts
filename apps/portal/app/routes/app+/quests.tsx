import logger from '@lib/utils/logger'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function Quests() {
  const { message } = useLoaderData<typeof loader>()
  logger('message from profile overview loader', message)

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">Quests Route</div>
      <pre>This is a placeholder for the Quests route</pre>
      <pre>quests route loader: {message}</pre>
    </div>
  )
}
