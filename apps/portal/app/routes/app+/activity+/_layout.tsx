import { NestedTabs } from '@components/nested-tabs'
import { Outlet } from '@remix-run/react'
import { activityRouteOptions } from 'app/consts'
import FullPageLayout from 'app/layouts/full-page-layout'

export default function ActivityLayout() {
  return (
    <FullPageLayout>
      <NestedTabs outlet={Outlet} options={activityRouteOptions} />
    </FullPageLayout>
  )
}
