import { useEffect, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Input,
  Label,
  Separator,
  Text,
  TextVariant,
  toast,
} from '@0xintuition/1ui'
import {
  ApiError,
  IdentitiesService,
  UserPresenter,
  UsersService,
} from '@0xintuition/api'

import PrivyLogout from '@client/privy-logout'
import ErrorList from '@components/error-list'
import { Header } from '@components/header'
import RelicCard from '@components/relic-card/relic-card'
import RelicOnboadingVideo from '@components/relic-onboarding-video/relic-onboarding-video'
import SiteWideBanner from '@components/site-wide-banner'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useInviteCodeFetcher } from '@lib/hooks/useInviteCodeFetcher'
import { inviteCodeSchema } from '@lib/schemas/create-identity-schema'
import logger from '@lib/utils/logger'
import { getMaintenanceMode } from '@lib/utils/maintenance'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { FeatureFlags, getFeatureFlags } from '@server/env'
import { getRelicCount } from '@server/relics'
import { PATHS } from 'app/consts'
import { AnimatePresence, motion } from 'framer-motion'

export async function loader({ request }: LoaderFunctionArgs) {
  getMaintenanceMode()
  const featureFlags = getFeatureFlags()

  const wallet = await requireUserWallet(request)
  if (!wallet) {
    return redirect('/login')
  }

  const relicCount = await getRelicCount(wallet as `0x${string}`)
  const relicHolder = relicCount > 0

  let userObject
  try {
    userObject = await fetchWrapper(request, {
      method: UsersService.getUserByWalletPublic,
      args: {
        wallet,
      },
    })
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 400 || error.status === 404)
    ) {
      console.error('No user found in DB, needs to enter invite code')
      return json({ wallet, relicHolder, featureFlags })
    }
    throw error
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
      return json({ wallet, userObject, relicHolder, featureFlags })
    }
    throw error
  }

  if (userIdentity) {
    return redirect(`${PATHS.HOME}`)
  }

  return json({ wallet, userObject, relicHolder, featureFlags })
}

interface InviteRouteLoaderData {
  wallet: string
  userObject: UserPresenter
  relicHolder: boolean
  featureFlags: FeatureFlags
}

export default function InviteRoute() {
  const { wallet, relicHolder, featureFlags } =
    useLoaderData<InviteRouteLoaderData>()
  const { inviteCodeFetcher } = useInviteCodeFetcher()
  const [loading, setLoading] = useState(false)
  const [fetcherError, setFetcherError] = useState<string | null>(null)
  const [showVideo, setShowVideo] = useState(false)

  const [form, fields] = useForm({
    id: 'invite-code',
    constraint: getZodConstraint(inviteCodeSchema()),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: inviteCodeSchema,
      })
    },
    shouldValidate: 'onSubmit',
    onSubmit: async (e) => handleSubmit(e),
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('invite_code', event.currentTarget.invite_code.value)

      const submission = parseWithZod(formData, {
        schema: inviteCodeSchema(),
      })

      if (
        submission.status === 'error' &&
        submission.error !== null &&
        Object.keys(submission.error).length
      ) {
        console.error(
          'Redeem invite code validation errors: ',
          submission.error,
        )
        return
      }

      setLoading(true)

      try {
        inviteCodeFetcher.submit(formData, {
          action: '/actions/redeem-invite-code',
          method: 'post',
        })
      } catch (error: unknown) {
        if (error instanceof Error) {
          const errorMessage = 'Error in redeeming invite code.'
          toast.error(errorMessage)
        }
        console.error('Error redeeming invite code', error)
        setLoading(false)
      }
    } catch (error: unknown) {
      logger(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (inviteCodeFetcher.state === 'idle' && inviteCodeFetcher.data) {
      setLoading(false)
      if (inviteCodeFetcher.data.status === 'success') {
        handleContinue()
      } else if (inviteCodeFetcher.data.error) {
        const errorMessage = inviteCodeFetcher.data.error
        setFetcherError(errorMessage)
        toast.error(errorMessage)
      }
    }
  }, [inviteCodeFetcher.state, inviteCodeFetcher.data])

  const handleContinue = () => {
    setShowVideo(true)
  }

  return (
    <div>
      <SiteWideBanner featureFlags={featureFlags} />
      <div className="flex flex-col justify-between min-h-screen w-full p-4 md:p-8">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <AnimatePresence mode="wait">
            {!showVideo ? (
              <motion.div
                key="inviteForm"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-12 w-full max-w-7xl"
              >
                <div className="flex flex-col w-full md:w-1/2 max-w-lg items-end justify-end">
                  <div className="flex flex-col justify-between items-start h-full gap-4">
                    <div className="text-foreground/90 text-3xl font-semibold text-center md:text-left">
                      Enter your invite code
                    </div>
                    <inviteCodeFetcher.Form
                      method="post"
                      {...getFormProps(form)}
                      encType="multipart/form-data"
                      action="/actions/create-identity"
                      className="flex flex-col gap-6"
                    >
                      <div>
                        <Label htmlFor={fields.invite_code.id} hidden>
                          Invite Code
                        </Label>
                        <Input
                          {...getInputProps(fields.invite_code, {
                            type: 'text',
                          })}
                          className="md:w-96"
                          placeholder="Enter your invite code here"
                        />
                        <ErrorList
                          id={fields.invite_code.errorId}
                          errors={[
                            ...(fields.invite_code.errors || []),
                            ...(fetcherError ? [fetcherError] : []),
                          ]}
                        />
                      </div>
                      <Text
                        variant={TextVariant.body}
                        className="text-muted-foreground md:w-96"
                      >
                        Intuition is currently in Closed Beta. Obtain an invite
                        code or a Relic to gain access!
                      </Text>
                    </inviteCodeFetcher.Form>
                    <div className="flex justify-center md:justify-start mt-auto w-full">
                      <Button
                        form={form.id}
                        type="submit"
                        variant={ButtonVariant.primary}
                        size={ButtonSize.lg}
                        disabled={loading}
                        className="w-full md:w-48"
                      >
                        Setup Profile
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block w-px h-[250px] bg-secondary-foreground self-center"></div>
                <Separator className="bg-secondary-foreground block md:hidden" />
                <div className="flex flex-col md:flex-row gap-6 w-full md:w-1/2 max-w-lg">
                  <div className="flex flex-col justify-between items-start h-full gap-4">
                    <div className="flex flex-col items-start h-full gap-4">
                      <div className="text-white text-3xl font-semibold text-center md:text-left">
                        Relic Holders
                      </div>
                      <Text
                        variant={TextVariant.body}
                        className="text-muted-foreground text-center md:text-left md:pr-2"
                      >
                        The Relic, a key to the unseen realms. Its bearer walks
                        the paths of Intuition&apos;s Beta. Seek your own: forge
                        it in the fires of creation{' '}
                        <Link
                          to={'https://intuition.church'}
                          target="_blank"
                          className="text-foreground/70"
                        >
                          here
                        </Link>
                        .
                      </Text>
                    </div>
                    <div className="flex flex-col items-center md:items-start w-full">
                      <div className="mb-6 md:hidden w-full flex justify-center">
                        <RelicCard variant={'v1'} />
                      </div>
                      <Button
                        type="button"
                        variant={ButtonVariant.primary}
                        size={ButtonSize.lg}
                        disabled={loading || !relicHolder}
                        className="w-full md:w-48"
                        onClick={handleContinue}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col m-auto">
                    <RelicCard variant={'v1'} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <RelicOnboadingVideo variant="v2" />
            )}
          </AnimatePresence>
        </div>
        <PrivyLogout wallet={wallet} />
      </div>
    </div>
  )
}
