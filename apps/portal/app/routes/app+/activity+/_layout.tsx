import { NestedTabs } from '@components/nested-tabs'
import { LoaderFunctionArgs } from '@remix-run/node'
import { json, Outlet, useLoaderData } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { PATHS } from 'app/consts'
import FullPageLayout from 'app/layouts/full-page-layout'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await getUserWallet(request)
  return json({ userWallet })
}

export default function ActivityLayout() {
  const { userWallet } = useLoaderData<typeof loader>()
  return (
    <FullPageLayout>
      <NestedTabs
        outlet={Outlet}
        options={[
          {
            value: 'global',
            label: 'Global Activity',
            basePath: PATHS.ACTIVITY,
          },
          {
            value: 'personal',
            label: 'Your Activity',
            basePath: PATHS.ACTIVITY,
            hidden: !userWallet,
          },
        ]}
      />
    </FullPageLayout>
  )
}
