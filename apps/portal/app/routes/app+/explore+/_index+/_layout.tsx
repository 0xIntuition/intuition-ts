import { exploreRouteOptions } from 'constants'

import { NestedVerticalLayout } from '@components/nested-vertical-layout'
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

  return <NestedVerticalLayout outlet={Outlet} options={exploreRouteOptions} />
}
