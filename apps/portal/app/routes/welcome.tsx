import {
  Button,
  ButtonSize,
  ButtonVariant,
  Text,
  TextVariant,
} from '@0xintuition/1ui'
import { ApiError, IdentitiesService } from '@0xintuition/api'

import PrivyLogout from '@client/privy-logout'
import { Header } from '@components/header'
import { getMaintenanceMode } from '@lib/utils/maintenance'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { json, Link, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { PATHS } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  getMaintenanceMode()

  const wallet = await requireUserWallet(request)
  if (!wallet) {
    return redirect('/login')
  }

  let userIdentity
  try {
    userIdentity = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityById,
      args: { id: wallet },
    })
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 400 || error.status === 404)
    ) {
      console.error('No user identity associated with wallet')
      return json({ wallet })
    }
    throw error
  }

  if (userIdentity) {
    throw redirect(`${PATHS.HOME}`)
  }

  return json({ wallet })
}

export default function WelcomePage() {
  const { wallet } = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col justify-between h-screen w-full p-8">
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="flex-col justify-start items-start inline-flex gap-6">
          <h1 className="text-4xl font-bold mb-6">Chapter 0: The Big Bang</h1>
          <div className="max-w-2xl space-y-2">
            <Text variant={TextVariant.bodyLarge} className="text-primary/70">
              In the beginning, there was nothing. Then suddenly - everything.
            </Text>
            <Text variant={TextVariant.bodyLarge} className="text-primary/70">
              All that the universe would ever be composed of, birthed into
              existence, in an instant.
            </Text>
            <Text variant={TextVariant.bodyLarge} className="text-primary/70">
              A single spec of condensed matter, exploding into a vast universe.
            </Text>
            <Text variant={TextVariant.bodyLarge} className="text-primary/70">
              While energy would neither be created nor destroyed, the interplay
              between these newly created atoms would go on to create something
              beautiful...
            </Text>
            <Text variant={TextVariant.bodyLarge} className="text-primary/70">
              What was made separate would once again become whole. And what
              would be created in the process would be even more beautiful than
              what came before...
            </Text>
          </div>
          <div className="mt-8 space-y-2">
            <Text variant={TextVariant.bodyLarge} className="text-primary/70">
              Our story begins with the &lsquo;atom&rsquo;.
            </Text>
            <Text variant={TextVariant.bodyLarge} className="text-primary/70">
              The fundamental building block of our universe.
            </Text>
            <Text variant={TextVariant.bodyLarge} className="text-primary/70">
              And our &lsquo;atoms&rsquo; begin with you.
            </Text>
          </div>
          <Link to="/create" className="m-auto mt-8">
            <Button
              variant={ButtonVariant.primary}
              size={ButtonSize.lg}
              className="w-40 m-auto"
            >
              Begin
            </Button>
          </Link>
        </div>
      </div>
      <PrivyLogout wallet={wallet} />
    </div>
  )
}
