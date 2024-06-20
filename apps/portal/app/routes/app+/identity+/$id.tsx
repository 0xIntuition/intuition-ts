import { NestedLayout } from '@components/nested-layout'
import { identityRouteOptions } from '@lib/utils/constants'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: '$id route layout: hack the planet',
  })
}

export default function IdentityDetails() {
  const { message } = useLoaderData<typeof loader>()
  return (
    <NestedLayout outlet={Outlet} options={identityRouteOptions}>
      <>
        <div>Identity Details Route</div>
        <div>{message}</div>
      </>
    </NestedLayout>
  )
}
