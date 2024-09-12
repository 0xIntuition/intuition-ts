import logger from '@lib/utils/logger'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

export async function loader() {
  const readOnlyParentRouteData = 'This is the /readonly parent route loader'
  logger('Parent readonly loader running')

  return json({
    readOnlyParentRouteData,
  })
}

export default function ReadOnlyLayout() {
  const { readOnlyParentRouteData } = useLoaderData<typeof loader>()
  logger('Parent route data:', readOnlyParentRouteData)

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">ReadOnly Parent Layout</div>
      <div>{readOnlyParentRouteData}</div>
      <Outlet />
    </div>
  )
}
