/* eslint-disable jsx-a11y/media-has-caption */
import { useCallback, useEffect, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  Icon,
  IconName,
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
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useInviteCodeFetcher } from '@lib/hooks/useInviteCodeFetcher'
import { inviteCodeSchema } from '@lib/schemas/create-identity-schema'
import logger from '@lib/utils/logger'
import { getMaintenanceMode } from '@lib/utils/maintenance'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { getRelicCount } from '@server/relics'
import { PATHS, RELIC_LEGENDARY_V2_WITH_AUDIO_MP4 } from 'app/consts'
import { AnimatePresence, motion } from 'framer-motion'

export async function loader({ request }: LoaderFunctionArgs) {
  getMaintenanceMode()

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
      return json({ wallet, relicHolder })
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
      return json({ wallet, userObject, relicHolder })
    }
    throw error
  }

  if (userIdentity) {
    return redirect(`${PATHS.HOME}`)
  }

  return json({ wallet, userObject, relicHolder })
}

interface InviteRouteLoaderData {
  wallet: string
  userObject: UserPresenter
  relicHolder: boolean
}

export default function InviteRoute() {
  const { wallet, relicHolder } = useLoaderData<InviteRouteLoaderData>()
  const navigate = useNavigate()
  const { inviteCodeFetcher } = useInviteCodeFetcher()
  const [loading, setLoading] = useState(false)
  const [fetcherError, setFetcherError] = useState<string | null>(null)
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoVolume = 0.33

  const videoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      if (node) {
        node.volume = videoVolume
      }
    },
    [videoVolume],
  )

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

  const handleVideoEnd = () => {
    navigate('/the-big-bang')
  }

  const getVolumeIcon = () => {
    return isMuted ? IconName.volumeMuted : IconName.volumeFull
  }

  return (
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
                        {...getInputProps(fields.invite_code, { type: 'text' })}
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
            <motion.div
              key="videoPlayer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <div className={cn(`overflow-hidden rounded-xl`)}>
                <video
                  ref={videoRef}
                  src={RELIC_LEGENDARY_V2_WITH_AUDIO_MP4}
                  title={'Relic'}
                  playsInline
                  autoPlay
                  muted={isMuted}
                  className="rounded-xl overflow-hidden items-center justify-center w-full md:max-w-[500px] xl:max-w-[1000px] shadow-lg"
                  onEnded={handleVideoEnd}
                />
              </div>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-6 right-6"
                >
                  <Button
                    variant={ButtonVariant.primary}
                    size={ButtonSize.iconXl}
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-primary/70"
                  >
                    <Icon
                      name={getVolumeIcon()}
                      className="h-12 w-12 fill-black"
                    />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PrivyLogout wallet={wallet} />
    </div>
  )
}
