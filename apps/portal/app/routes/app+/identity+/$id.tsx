import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: '$id route layout: hack the planet',
  })
}

export default function IdentityDetails() {
  const { message } = useLoaderData<typeof loader>()
  return (
    <div className="m-8 grid grid-cols-3 gap-4">
      <div className="col-span-1 border border-solid border-purple-100 h-full">
        <div className="col-span-1 flex flex-col items-center m-8">
          <div>Identity Details Route</div>
          <div>{message}</div>
        </div>
      </div>

      <div className="col-span-2 border border-solid border-cyan-100">
        <Outlet />
      </div>
    </div>
  )
}
