import { NestedVerticalLayout } from '@components/nested-vertical-layout'
import { Outlet } from '@remix-run/react'
import { activityRouteOptions } from 'consts'

export default function ActivityLayout() {
  return <NestedVerticalLayout outlet={Outlet} options={activityRouteOptions} />
}
