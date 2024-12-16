import {
  ActivePositionCard,
  Claim,
  ClaimPosition,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Identity,
  Skeleton,
  Text,
} from '@0xintuition/1ui'
import { GetAtomQuery } from '@0xintuition/graphql'

import StakingRadioGroup from '@components/staking-radio-group'
import { TransactionState } from '@components/transaction-state'
import {
  formatBalance,
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
} from '@lib/utils/misc'
import { IPFS_GATEWAY_URL, PATHS } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'

import SaveReview from './save-review'

interface SaveFormProps {
  tagAtom: GetAtomQuery['atom'] | null
  atom: GetAtomQuery['atom'] | null
  user_assets: string
  entry_fee: string
  exit_fee: string
  min_deposit: string
  val: string
  setVal: (val: string) => void
  mode: string | undefined
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
  isLoading: boolean
}

export default function SaveForm({
  atom,
  tagAtom,
  user_assets,
  entry_fee,
  exit_fee,
  min_deposit,
  val,
  setVal,
  mode,
  dispatch,
  state,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
  isLoading,
}: SaveFormProps) {
  return (
    <>
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
                the respective Tag&apos;s List. The more ETH staked, the higher
                the Identity will rank in the respective Tag&apos;s List.
              </Text>
            </DialogDescription>
          </DialogHeader>
          <div className="h-full w-full flex-col py-5 gap-5 inline-flex">
            <div className="flex items-center w-full mr-2.5 gap-5 justify-center">
              <Claim
                size="md"
                subject={{
                  variant:
                    atom?.type === 'Account' || atom?.type === 'Default'
                      ? Identity.user
                      : Identity.nonUser,
                  label: getAtomLabelGQL(atom),
                  imgSrc: getAtomImageGQL(atom),
                  id: atom?.id,
                  description: getAtomDescriptionGQL(atom),
                  ipfsLink: getAtomIpfsLinkGQL(atom),
                  link: getAtomLinkGQL(atom),
                }}
                predicate={{
                  variant: Identity.nonUser,
                  label: 'has tag',
                  imgSrc: '',
                  id: 'QmakZTBNcZandAb7Pj42MkptLmTZuGXoMZKKvugqTcy76P',
                  description: '',
                  ipfsLink: `${IPFS_GATEWAY_URL}/QmakZTBNcZandAb7Pj42MkptLmTZuGXoMZKKvugqTcy76P`,
                  link: `${PATHS.IDENTITY}/QmakZTBNcZandAb7Pj42MkptLmTZuGXoMZKKvugqTcy76P`,
                }}
                object={{
                  variant: Identity.nonUser,
                  label: getAtomLabelGQL(tagAtom),
                  imgSrc: getAtomImageGQL(tagAtom),
                  id: tagAtom?.id,
                  description: getAtomDescriptionGQL(tagAtom),
                  ipfsLink: getAtomIpfsLinkGQL(tagAtom),
                  link: getAtomLinkGQL(tagAtom),
                }}
                maxIdentityLength={12}
              />
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="w-full bg-neutral-50/5 rounded-lg border border-neutral-300/10 flex-col justify-start items-start inline-flex">
                {isLoading ? (
                  <Skeleton className="h-12 w-full" />
                ) : (
                  <ActivePositionCard
                    value={Number(formatBalance(user_assets, 18))}
                    claimPosition={
                      user_assets > '0' ? ClaimPosition.claimFor : null
                    }
                  />
                )}
              </div>
            </div>
            <div className="rounded-t-lg bg-primary-950/15 w-full">
              <StakingRadioGroup
                setVal={setVal}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                showErrors={showErrors}
                setShowErrors={setShowErrors}
                isLoading={isLoading}
                min_deposit={min_deposit}
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
            tagAtom={tagAtom}
            atom={atom}
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
