import { Text } from '@0xintuition/1ui'

import PrivyLogoutButton from '@client/privy-logout-button'
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSubmit } from '@remix-run/react'
import {
  getUser,
  getUserById,
  getUserId,
  logout,
  requireUserId,
} from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  const user = await getUser(request)
  return json({ message: 'hack the planet', user })
}

export async function action({ request }: ActionFunctionArgs) {
  return await logout({
    request,
    redirectTo: '/playground',
  })
}

export default function Protected() {
  const submit = useSubmit()
  const { message, user } = useLoaderData<typeof loader>()

  function handleLogout() {
    submit('playground/protected', {
      method: 'post',
    })
  }

  return (
    <div className="p-10 space-y-5">
      <div className="flex items-center justify-between w-full p-5">
        <PrivyLogoutButton handleLogout={handleLogout} />
      </div>
      <div className="flex items-center justify-center rounded-lg theme-border p-5">
        {user && (
          <div>
            <Text
              variant="bodyLarge"
              weight="medium"
              className="text-foreground/50"
            >
              Authed User Claims
            </Text>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
