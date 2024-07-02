import { NestedVerticalLayout } from '@components/nested-vertical-layout'
import { exploreRouteOptions } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { json, Outlet, useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function ExploreClaims() {
  const { message } = useLoaderData<typeof loader>()
  logger('message from profile overview loader', message)

  return (
    <NestedVerticalLayout outlet={Outlet} options={exploreRouteOptions}>
      <div className="m-8 flex flex-col items-center gap-4">
        <div className="flex flex-col">Explore Index Route</div>
        <pre>This is a placeholder for the Explore Index route</pre>
        <pre>route loader: {message}</pre>
      </div>
    </NestedVerticalLayout>
  )
}
