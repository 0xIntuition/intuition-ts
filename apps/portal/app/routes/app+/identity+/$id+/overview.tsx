import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function IdentityOverview() {
  const { message } = useLoaderData<typeof loader>()
  return (
    <div className="m-8 flex flex-col items-center">
      <div className="flex flex-col">Identity Overview Route</div>
      <div>{message}</div>
    </div>
  )
}
