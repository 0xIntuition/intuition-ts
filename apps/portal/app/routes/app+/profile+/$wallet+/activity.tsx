import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function ProfileActivity() {
  const { message } = useLoaderData<typeof loader>()
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">Profile Activity Route</div>
      <div>{message}</div>
    </div>
  )
}
