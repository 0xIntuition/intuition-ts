import { useEffect } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@0xintuition/1ui'
import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
  OpenAPI,
  UserPresenter,
  UsersService,
  UserTotalsPresenter,
} from '@0xintuition/api'

import { PrivyVerifiedLinks } from '@client/privy-verified-links'
import { NestedLayout } from '@components/nested-layout'
import { editProfileModalAtom } from '@lib/state/store'
import { getAuthHeaders, sliceString } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useMatches,
  useRevalidator,
} from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'
import * as blockies from 'blockies-ts'
import { useAtom } from 'jotai'
import { Loader2Icon } from 'lucide-react'
import { SessionUser } from 'types/user'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return console.log('No user found in session')
  }

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: user.details.wallet.address,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userIdentity = undefined
      console.log(
        `${error.name} - ${error.status}: ${error.message} ${error.url}`,
      )
    } else {
      throw error
    }
  }

  if (!userIdentity) {
    return redirect('/create')
  }

  let userObject
  try {
    userObject = await UsersService.getUserByWallet({
      wallet: user.details.wallet.address,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userObject = undefined
      console.log(
        `${error.name} - ${error.status}: ${error.message} ${error.url}`,
      )
    } else {
      throw error
    }
  }

  if (!userObject) {
    return console.log('No user found in DB')
  }

  let userTotals
  try {
    userTotals = await UsersService.getUserTotals({
      id: userObject.id,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userTotals = undefined
      console.log(
        `${error.name} - ${error.status}: ${error.message} ${error.url}`,
      )
    } else {
      throw error
    }
  }

  return json({ user, userIdentity, userObject, userTotals })
}

export default function Profile() {
  const { user, userIdentity, userObject, userTotals } = useLoaderData<{
    user: SessionUser
    userIdentity: IdentityPresenter
    userObject: UserPresenter
    userTotals: UserTotalsPresenter
  }>()

  const imgSrc = blockies
    .create({ seed: user?.details?.wallet?.address })
    .toDataURL()

  const [editProfileModalActive, setEditProfileModalActive] =
    useAtom(editProfileModalAtom)

  const revalidator = useRevalidator()

  useEffect(() => {
    setEditProfileModalActive(false)
  }, [])

  useEffect(() => {
    if (!editProfileModalActive) {
      revalidator.revalidate()
    }
  }, [editProfileModalActive])

  const matches = useMatches()
  const currentPath = matches[matches.length - 1].pathname
  console.log('currentPath', currentPath)

  // List of paths that should not use the ProfileLayout
  const excludedPaths = ['/app/profile/create']

  if (excludedPaths.includes(currentPath)) {
    return <Outlet />
  }

  return (
    <NestedLayout outlet={Outlet}>
      <div className="flex flex-col">
        <>
          <div className="w-[300px] h-[230px] flex-col justify-start items-start gap-5 inline-flex">
            <div className="w-[300px] justify-start items-center gap-[18px] inline-flex">
              <div className="w-[70px] pr-1.5 justify-start items-center flex">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={userObject.image ?? imgSrc} alt="Avatar" />
                  <AvatarFallback>
                    <Loader2Icon className="h-6 w-6 animate-spin" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start inline-flex">
                <div className="justify-start items-end gap-1.5 inline-flex">
                  <div className="text-neutral-200 text-xl font-medium leading-[30px]">
                    {userObject.display_name}
                  </div>
                </div>
                <div className="self-stretch h-6 pb-0.5 justify-start items-end gap-2.5 inline-flex">
                  <div className="text-white/50 text-sm font-medium leading-tight">
                    {userObject.ens_name ??
                      sliceString(userObject.wallet, 6, 4)}
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-start items-start gap-4 inline-flex">
              <div className="justify-start items-start gap-1 flex">
                <div className="text-neutral-300 text-sm font-medium leading-tight">
                  -
                </div>
                <div className="text-white/50 text-sm font-normal leading-tight">
                  Following
                </div>
              </div>
              <div className="justify-start items-start gap-1 flex">
                <div className="text-neutral-300 text-sm font-medium leading-tight">
                  -
                </div>
                <div className="text-white/50 text-sm font-normal leading-tight">
                  Followers
                </div>
              </div>
              <div className="justify-start items-start gap-[3px] flex">
                <div className="text-green-500 text-sm font-medium leading-tight">
                  {userTotals.user_points}
                </div>
                <div className="text-white/50 text-sm font-normal leading-tight">
                  Points
                </div>
              </div>
            </div>
            <div className="justify-center items-center gap-2.5 inline-flex">
              <div className="w-[300px] text-neutral-300 text-sm font-medium leading-tight">
                {userObject.description}
              </div>
            </div>
          </div>

          <div className="m-8 flex flex-col items-center gap-4">
            <div className="flex flex-col">
              <div>
                <p>User Identity Exists</p>
                <p>{userIdentity.id}</p>
                <div className="flex flex-col gap-4">
                  <Accordion
                    type="multiple"
                    className="w-full"
                    defaultValue={['verified-links']}
                  >
                    <AccordionItem value="verified-links">
                      <AccordionTrigger>
                        <span className="text-secondary-foreground text-sm font-normal">
                          Verified Links
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <PrivyVerifiedLinks
                          privyUser={JSON.parse(JSON.stringify(user))}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Accordion
                type="multiple"
                className="w-full"
                defaultValue={['verified-links']}
              >
                <AccordionItem value="verified-links">
                  <AccordionTrigger>
                    <span className="text-secondary-foreground text-sm font-normal">
                      Verified Links
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <PrivyVerifiedLinks
                      privyUser={JSON.parse(JSON.stringify(user))}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </>
      </div>
    </NestedLayout>
  )
}
