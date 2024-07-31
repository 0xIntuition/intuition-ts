import { NestedTabs } from '@components/nested-tabs'
import { Outlet } from '@remix-run/react'
import FullPageLayout from 'app/layouts/full-page-layout'
import { activityRouteOptions } from 'consts'

export default function ActivityLayout() {
  return (
    <FullPageLayout>
      <NestedTabs outlet={Outlet} options={activityRouteOptions} />
    </FullPageLayout>
  )
}
