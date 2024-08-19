import { useEffect, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Input,
  Label,
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
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { getRelicCount } from '@server/relics'
import { PATHS } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
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

  if (userObject) {
    throw redirect('/welcome')
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
    }

    if (userIdentity) {
      throw redirect(`${PATHS.PROFILE}`)
    }

    return json({ wallet, userObject, relicHolder })
  }
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

      // Initial form validation
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
      }
    } catch (error: unknown) {
      logger(error)
    }
  }

  useEffect(() => {
    if (inviteCodeFetcher.state === 'idle') {
      setLoading(false)
      if (inviteCodeFetcher.data?.status === 'success') {
        navigate('/welcome')
      } else if (inviteCodeFetcher.data?.error) {
        const errorMessage = inviteCodeFetcher.data.error
        setFetcherError(errorMessage)
        toast.error(errorMessage)
      }
    }
  }, [inviteCodeFetcher.state, inviteCodeFetcher.data, navigate])

  return (
    <div className="flex flex-col justify-between h-screen w-full p-8">
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="flex-col justify-start items-start inline-flex gap-6">
          {relicHolder ? (
            <>
              <div className="flex-col justify-start items-start flex">
                <div className="self-stretch text-white text-3xl font-semibold">
                  Welcome, Seeker
                </div>
              </div>
              <RelicCard />
              <Link to={'/welcome'} prefetch="intent" className="m-auto">
                <Button
                  type="button"
                  variant={ButtonVariant.primary}
                  size={ButtonSize.lg}
                  disabled={loading}
                  className="w-48"
                >
                  Continue
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex-col justify-start items-start flex">
                <div className="self-stretch text-white text-3xl font-semibold">
                  Enter your invite code
                </div>
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
                    className="w-96"
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
                  className="text-muted-foreground w-80"
                >
                  Unlock exclusive access with your invite code. Join us today
                  for a premium experience.
                </Text>
                <Button
                  form={form.id}
                  type="submit"
                  variant={ButtonVariant.primary}
                  size={ButtonSize.lg}
                  disabled={loading}
                  className="w-48"
                >
                  Setup Profile
                </Button>
              </inviteCodeFetcher.Form>
            </>
          )}
        </div>
      </div>
      <PrivyLogout wallet={wallet} />
    </div>
  )
}
