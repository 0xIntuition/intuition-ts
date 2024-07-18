import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'Quest Chapter Route',
  })
}

export default function Quests() {
  const { message } = useLoaderData<typeof loader>()

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <Link to="/app/quest">Back to quest home</Link>
      <div className="flex flex-col">{message}</div>
    </div>
  )
}
