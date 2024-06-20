import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function IdentityDataAbout() {
  const { message } = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col items-center gap-4">
      <pre>Identity Data-About Route</pre>
      data about loader: {message}
    </div>
  )
}
