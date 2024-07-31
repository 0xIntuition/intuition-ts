import { NestedTabs } from '@components/nested-tabs'
import logger from '@lib/utils/logger'
import { json, Outlet, useLoaderData } from '@remix-run/react'
import FullPageLayout from 'app/layouts/full-page-layout'
import { exploreRouteOptions } from 'consts'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function ExploreLayout() {
  const { message } = useLoaderData<typeof loader>()
  logger('message from profile overview loader', message)

  return (
    <FullPageLayout>
      <NestedTabs outlet={Outlet} options={exploreRouteOptions} />
    </FullPageLayout>
  )
}
