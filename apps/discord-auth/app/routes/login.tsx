import { json, type LoaderFunctionArgs } from '@remix-run/node'

import { getDiscordAuthURL } from '../.server/discord'
import { getSession } from '../.server/session'

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request)
  const discordAuthUrl = getDiscordAuthURL()

  return json({
    discordUser: session.discordUser,
    discordAuthUrl,
  })
}

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Welcome Intuit</h1>
        <p className="text-gray-400">Discord Role Claims Have Ended</p>
      </div>
    </div>
  )
}
