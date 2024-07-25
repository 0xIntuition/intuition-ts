import { NestedVerticalLayout } from '@components/nested-vertical-layout'
import { activityRouteOptions } from '@lib/utils/constants'
import { Outlet } from '@remix-run/react'

export default function ActivityLayout() {
  return <NestedVerticalLayout outlet={Outlet} options={activityRouteOptions} />
}
