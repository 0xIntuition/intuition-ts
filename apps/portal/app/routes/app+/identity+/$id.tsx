import { NestedLayout } from '@components/nested-layout'
import { identityRouteOptions } from '@lib/utils/constants'
import { json } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export async function loader() {
  return json({
    message: '$id route layout: hack the planet',
  })
}

export default function IdentityDetails() {
  return (
    <NestedLayout outlet={Outlet} options={identityRouteOptions}>
      <div className="flex flex-col">Identity Details route</div>
    </NestedLayout>
  )
}
