import { NestedTabs } from '@components/nested-tabs'
import { Outlet } from '@remix-run/react'
import { exploreRouteOptions } from 'app/consts'
import FullPageLayout from 'app/layouts/full-page-layout'

export default function ExploreLayout() {
  return (
    <FullPageLayout>
      <NestedTabs outlet={Outlet} options={exploreRouteOptions} />
    </FullPageLayout>
  )
}
