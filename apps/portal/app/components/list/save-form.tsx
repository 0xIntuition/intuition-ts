import {
  ActivePositionCard,
  Button,
  ButtonVariant,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  Identity,
  IdentityTag,
  ProfileCard,
  Skeleton,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter, TagEmbeddedPresenter } from '@0xintuition/api'

import { TransactionState } from '@components/transaction-state'
import {
  formatBalance,
  getAtomDescription,
  getAtomId,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
} from '@lib/utils/misc'
import { type FetcherWithComponents } from '@remix-run/react'
import { PATHS } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'

import SaveActions from './save-actions'
import SaveReview from './save-review'

interface SaveFormProps {
  tag: IdentityPresenter | TagEmbeddedPresenter
  identity: IdentityPresenter
  user_assets: string
  entry_fee: string
  exit_fee: string
  val: string
  setVal: (val: string) => void
  mode: string | undefined
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  fetchReval: FetcherWithComponents<unknown>
  formRef: React.RefObject<HTMLFormElement>
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
  isLoading: boolean
}

export default function SaveForm({
  identity,
  tag,
  user_assets,
  entry_fee,
  exit_fee,
  val,
  setVal,
  mode,
  dispatch,
  state,
  fetchReval,
  formRef,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
  isLoading,
}: SaveFormProps) {
  return (
    <>
      <fetchReval.Form
        hidden
        ref={formRef}
        action={`/actions/reval`}
        method="post"
      >
        <input type="hidden" name="eventName" value="attest" />
      </fetchReval.Form>
      {state.status === 'idle' ? (
        <>
          <DialogHeader>
            <DialogTitle className="justify-between">
              <div className="flex-col justify-center items-start gap-1 inline-flex">
                <div className="justify-center items-center gap-2 inline-flex">
                  <Text variant="base" weight="medium">
                    Tag Identity
                  </Text>
                </div>
              </div>
            </DialogTitle>
            <DialogDescription>
              <Text variant="caption" className="text-neutral-50/50">
                Tag the Identity to improve discoverability, and to add it to
                the respective Tag&lsquo;s list.
              </Text>
            </DialogDescription>
          </DialogHeader>
          <div className="h-full w-full flex-col pt-5 px-10 pb-10 gap-5 inline-flex">
            <div className="flex items-center w-full mr-2.5 gap-5 ">
              <div className="flex flex-col gap-1">
                <Text
                  variant="caption"
                  weight="regular"
                  className="text-neutral-50/50"
                >
                  Identity:
                </Text>
                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger>
                    <IdentityTag
                      imgSrc={getAtomImage(identity)}
                      variant={
                        identity.is_user ? Identity.user : Identity.nonUser
                      }
                    >
                      <Trunctacular
                        value={getAtomLabel(identity)}
                        maxStringLength={18}
                      />
                    </IdentityTag>
                  </HoverCardTrigger>
                  <HoverCardContent side="top" align="center" className="w-max">
                    <div className="flex flex-col gap-4 w-80 max-md:w-[80%]">
                      <ProfileCard
                        variant={
                          identity.is_user ? Identity.user : Identity.nonUser
                        }
                        avatarSrc={getAtomImage(identity)}
                        name={getAtomLabel(identity)}
                        id={getAtomId(identity)}
                        bio={getAtomDescription(identity)}
                        ipfsLink={getAtomIpfsLink(identity)}
                      />
                      <a
                        href={
                          identity.is_user
                            ? `${PATHS.PROFILE}/${identity.id}`
                            : `${PATHS.IDENTITY}/${identity.identity_id}`
                        }
                      >
                        <Button
                          variant={ButtonVariant.secondary}
                          className="w-full"
                        >
                          View Identity{' '}
                          <Icon name={'arrow-up-right'} className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <div className="flex flex-col gap-1">
                <Text
                  variant="caption"
                  weight="regular"
                  className="text-neutral-50/50"
                >
                  Tag:
                </Text>
                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger>
                    <IdentityTag imgSrc={tag?.image} variant={Identity.nonUser}>
                      <Trunctacular
                        value={tag?.display_name}
                        maxStringLength={18}
                      />
                    </IdentityTag>
                  </HoverCardTrigger>
                  <HoverCardContent side="top" align="center" className="w-max">
                    <div className="flex flex-col gap-4 w-80 max-md:w-[80%]">
                      <ProfileCard
                        variant={
                          identity.is_user ? Identity.user : Identity.nonUser
                        }
                        avatarSrc={tag.image ?? ''}
                        name={tag.display_name ?? tag.identity_id}
                        id={tag.identity_id}
                        bio={tag.description ?? ''}
                      />
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="w-full bg-neutral-50/5 rounded-lg border border-neutral-300/10 flex-col justify-start items-start inline-flex">
                {isLoading ? (
                  <Skeleton className="h-12 w-full" />
                ) : (
                  <ActivePositionCard
                    value={Number(formatBalance(user_assets, 18, 4))}
                    claimPosition={user_assets > '0' ? 'claimFor' : null}
                  />
                )}
              </div>
            </div>
            <div className="rounded-t-lg bg-primary-950/15 w-full">
              <SaveActions
                setVal={setVal}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                showErrors={showErrors}
                setShowErrors={setShowErrors}
                isLoading={isLoading}
              />
            </div>
          </div>
        </>
      ) : state.status === 'review-transaction' ? (
        <div className="h-full flex flex-col">
          <SaveReview
            mode={mode}
            val={val}
            dispatch={dispatch}
            state={state}
            tag={tag}
            identity={identity}
            user_assets={user_assets}
            entry_fee={entry_fee}
            exit_fee={exit_fee}
          />
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <TransactionState
            status={state.status}
            txHash={state.txHash}
            type={mode === 'save' ? 'save' : 'unsave'}
          />
        </div>
      )}
    </>
  )
}
