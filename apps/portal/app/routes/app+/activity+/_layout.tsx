import { NestedVerticalLayout } from '@components/nested-vertical-layout'
import { activityRouteOptions } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { json, Outlet, useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function ActivityLayout() {
  const { message } = useLoaderData<typeof loader>()
  logger('message from activity route loader', message)

  return (
    <NestedVerticalLayout
      outlet={Outlet}
      options={activityRouteOptions}
    ></NestedVerticalLayout>
  )
}
