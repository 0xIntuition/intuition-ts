import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { isAuthedUser } from '@server/auth'
import { User } from '@types/user'

export async function loader({ request }: LoaderFunctionArgs) {
  const userResponse = await isAuthedUser(request)
  if (userResponse instanceof Response) {
    return userResponse
  }
  const user = userResponse as User

  return json({
    user,
    authedWallet: user?.wallet as `0x${string}` | undefined,
  })
}

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <div className="m-auto max-w-7xl lg:pt-5">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
