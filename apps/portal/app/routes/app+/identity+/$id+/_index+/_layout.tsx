import { json, useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function Identity() {
  const { message } = useLoaderData<typeof loader>()
  return (
    <div className="flex flex-col items-center gap-4">
      <pre>Identity Overview Route</pre>
      identity overview loader: {message}
    </div>
  )
}
