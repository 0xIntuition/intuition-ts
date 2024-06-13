import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
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
import EditProfileModal from '@components/edit-profile-modal'
import { editProfileModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'
import { useAtom } from 'jotai'
import { SessionUser } from 'types/user'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  console.log('[LOADER] user', session.get('user'))
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
    return redirect('/app/profile/create')
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

  logger('userIdentity', userIdentity)
  logger('userObject', userObject)
  logger('userTotals', userTotals)

  return json({ user, userIdentity, userObject, userTotals })
}

export default function Profile() {
  const { user, userIdentity, userObject, userTotals } = useLoaderData<{
    user: SessionUser
    userIdentity: IdentityPresenter
    userObject: UserPresenter
    userTotals: UserTotalsPresenter
  }>()

  const [editProfileModalActive, setEditProfileModalActive] =
    useAtom(editProfileModalAtom)

  return (
    <>
      <div className="w-[800px] justify-between items-start inline-flex">
        <div className="w-[500px] h-[184px] flex-col justify-start items-start gap-5 inline-flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-start items-center gap-[18px] flex">
              <div className="justify-start items-center gap-2.5 flex">
                <div className="w-[70px] pr-[3px] justify-center items-center flex">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={
                        userObject.image ?? 'https://via.placeholder.com/64x64'
                      }
                      alt="Avatar"
                    />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-col justify-end items-start gap-3.5 inline-flex">
                  <div className="text-neutral-200 text-base font-medium font-['Geist'] leading-normal">
                    {userObject.display_name}
                  </div>
                  <div className="h-px pb-0.5 justify-start items-end gap-2.5 inline-flex">
                    <div className="text-white/opacity-50 text-[10px] font-normal font-['Geist'] leading-none">
                      {userObject.ens_name ?? userObject.wallet}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => setEditProfileModalActive(true)}
            >
              Edit Profile
            </Button>
          </div>
          <div className="self-stretch h-[60px] flex-col justify-center items-start gap-1 flex">
            <div className="self-stretch h-[60px] flex-col justify-start items-start flex">
              <div className="self-stretch text-white text-sm font-normal font-['Geist'] leading-tight">
                {userIdentity.description}
              </div>
            </div>
          </div>
          <div className="self-stretch justify-start items-start gap-[22px] inline-flex">
            <div className="justify-start items-start gap-1 flex">
              <div className="text-neutral-300 text-sm font-medium font-['Geist'] leading-tight">
                -
              </div>
              <div className="text-white/opacity-50 text-sm font-normal font-['Geist'] leading-tight">
                Following
              </div>
            </div>
            <div className="justify-start items-start gap-1 flex">
              <div className="text-neutral-300 text-sm font-medium font-['Geist'] leading-tight">
                -
              </div>
              <div className="text-white/opacity-50 text-sm font-normal font-['Geist'] leading-tight">
                Followers
              </div>
            </div>
            <div className="justify-start items-start gap-1 flex">
              <div className="text-green-500 text-sm font-medium font-['Geist'] leading-tight">
                {userTotals.user_points}
              </div>
              <div className="text-white/opacity-50 text-sm font-normal font-['Geist'] leading-tight">
                Points
              </div>
            </div>
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
      <EditProfileModal
        id={userIdentity.id}
        userObject={userObject}
        open={editProfileModalActive}
        onClose={() => setEditProfileModalActive(false)}
      />
    </>
  )
}
