import { ExploreSearch } from '@components/explore/ExploreSearch'
import { FAKE_IDENTITIES } from '@lib/utils/fake-data'
import logger from '@lib/utils/logger'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function ExploreUsers() {
  const { message } = useLoaderData<typeof loader>()
  logger('message from profile overview loader', message)

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">Explore Users Route</div>
      <ExploreSearch variant="user" />

      {/* Just listing the Identities here for now */}
      {FAKE_IDENTITIES.map((identity) => (
        <p key={identity.id}>{identity.display_name}</p>
      ))}
    </div>
  )
}
