import { NestedVerticalLayout } from '@components/nested-vertical-layout'
import { Outlet } from '@remix-run/react'
import FullPageLayout from 'app/layouts/full-page-layout'
import { activityRouteOptions } from 'consts'

export default function ActivityLayout() {
  return (
    <FullPageLayout>
      <NestedVerticalLayout outlet={Outlet} options={activityRouteOptions} />
    </FullPageLayout>
  )
}
