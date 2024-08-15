import { useEffect, useState } from 'react'

import {
  Button,
  Claim,
  DialogHeader,
  DialogTitle,
  Icon,
  IconName,
  Identity,
  IdentityTag,
  Separator,
  Tag,
  Text,
  TextVariant,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { InfoTooltip } from '@components/info-tooltip'
import {
  formatDisplayBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { VaultDetailsType } from 'app/types'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'

interface StakeReviewProps {
  val: string
  mode: string | undefined
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  direction: 'for' | 'against'
  isError?: boolean
  modalType: 'identity' | 'claim' | null | undefined
  identity?: IdentityPresenter
  claim?: ClaimPresenter
  vaultDetails: VaultDetailsType
}

const calculateDepositFees = (val: string, vaultDetails: VaultDetailsType) => {
  const protocolFee = vaultDetails?.formatted_protocol_fee || 0
  const entryFee = vaultDetails?.formatted_entry_fee || 0
  const atomFractionOnDeposit =
    vaultDetails?.formatted_atom_deposit_fraction_for_triple || 0

  // Protocol Fee
  const protocolFeeAmount = +val * +protocolFee
  const valAfterProtocolFee = +val - protocolFeeAmount

  // Atom Deposit Flow
  const atomDepositAmount = valAfterProtocolFee * +atomFractionOnDeposit
  const atomEntryFeeAmount = atomDepositAmount * +entryFee
  const atomPositionAmount = atomDepositAmount - atomEntryFeeAmount

  // Triple Deposit Flow
  const tripleDepositAmount = valAfterProtocolFee - atomDepositAmount
  const tripleEntryFeeAmount = tripleDepositAmount * +entryFee
  const triplePositionAmount = tripleDepositAmount - tripleEntryFeeAmount

  // Total Fees
  const totalFees =
    protocolFeeAmount + atomEntryFeeAmount + tripleEntryFeeAmount

  const totalPosition = atomPositionAmount + triplePositionAmount

  return {
    totalFees,
    atomDepositAmount,
    protocolFeeAmount,
    atomEntryFeeAmount: atomEntryFeeAmount / 3,
    totalAtomEntryFeeAmount: atomEntryFeeAmount,
    tripleEntryFeeAmount,
    atomPositionAmount: atomPositionAmount / 3,
    totalAtomPositionAmount: atomPositionAmount,
    triplePositionAmount,
    totalPosition,
  }
}

const calculateRedeemFees = (val: string, vaultDetails: VaultDetailsType) => {
  const protocolFee = vaultDetails?.formatted_protocol_fee || 0
  const exitFee = vaultDetails?.formatted_exit_fee || 0

  // Protocol Fee
  const protocolFeeAmount = +val * +protocolFee
  const valAfterProtocolFee = +val - protocolFeeAmount

  // Triple Redeem Flow
  const redeemAmount = valAfterProtocolFee
  const exitFeeAmount = redeemAmount * +exitFee

  // Total Redeem
  const totalRedeem = redeemAmount - exitFeeAmount

  // Total Fees
  const totalFees = protocolFeeAmount + exitFeeAmount

  return {
    totalFees,
    protocolFeeAmount,
    redeemAmount,
    exitFeeAmount,
    totalRedeem,
  }
}

interface Fees {
  totalFees: number
  protocolFeeAmount: number
  // Deposit-specific properties
  atomDepositAmount?: number
  atomEntryFeeAmount?: number
  totalAtomEntryFeeAmount?: number
  tripleEntryFeeAmount?: number
  atomPositionAmount?: number
  totalAtomPositionAmount?: number
  triplePositionAmount?: number
  totalPosition?: number
  // Redeem-specific properties
  redeemAmount?: number
  exitFeeAmount?: number
  totalRedeem?: number
}

export default function StakeReview({
  val,
  mode,
  dispatch,
  state,
  direction,
  isError,
  modalType,
  identity,
  claim,
  vaultDetails,
}: StakeReviewProps) {
  const [statusText, setStatusText] = useState<string>('')

  useEffect(() => {
    const newText = isError
      ? 'Transaction failed'
      : state.status === 'transaction-pending' || state.status === 'confirm'
        ? 'Attestation in progress'
        : state.status === 'transaction-confirmed' ||
            state.status === 'complete'
          ? mode === 'deposit'
            ? 'Deposited successfully'
            : 'Redeemed successfully'
          : state.status === 'error'
            ? 'Transaction failed'
            : mode === 'deposit'
              ? 'Deposit'
              : 'Redeem'
    if (newText !== statusText) {
      setStatusText(newText)
    }
  }, [isError, state.status, mode, statusText])

  const fees: Fees =
    mode === 'deposit'
      ? calculateDepositFees(val, vaultDetails)
      : calculateRedeemFees(val, vaultDetails)

  const renderFeeBreakdown = () => (
    <div className="flex flex-col gap-2 w-full">
      {claim && mode === 'deposit'
        ? `When depositing on a claim, standard fees apply to your
                    deposit. Additionally, a portion of your deposit goes to the
                    claim's underlying identities, creating "atom
                    equity". This portion also incurs entry fees.`
        : claim && mode === 'redeem'
          ? `When redeeming from a claim, you pay a protocol fee and
      an exit fee on your withdrawal. This applies only to your
      position in the claim itself.`
          : `Standard fees apply to this transaction.`}
      <FeeBreakdown label="Protocol Fee" amount={fees.protocolFeeAmount} />
      {mode === 'redeem' && (
        <FeeBreakdown label="Exit Fee" amount={fees.exitFeeAmount ?? 0} />
      )}
      {claim && mode === 'deposit' && (
        <>
          <FeeBreakdown
            label="Identity Entry Fees"
            amount={fees.totalAtomEntryFeeAmount ?? 0}
          />
          <FeeBreakdown
            label="Claim Entry Fee"
            amount={fees.tripleEntryFeeAmount ?? 0}
          />
        </>
      )}
      {identity && mode === 'deposit' && (
        <FeeBreakdown
          label="Entry Fee"
          amount={fees.tripleEntryFeeAmount ?? 0}
        />
      )}
      <Separator />
      <FeeBreakdown label="Total Fees" amount={fees.totalFees} />
    </div>
  )

  const renderHeadlineInfoTooltip = () => {
    if (mode === 'deposit' && modalType === 'claim') {
      return (
        <InfoTooltip
          title="Depositing on a Claim"
          icon={IconName.circleInfo}
          trigger={
            <Icon name={IconName.circleQuestionMark} className="h-5 w-5" />
          }
          content={
            <div className="flex flex-col gap-2 w-full">
              When depositing on a claim, most goes to signal your stance on the
              claim itself. A portion is allocated to the claim&apos;s
              underlying identities, giving you &lsquo;atom equity&rsquo;. Both
              parts of your deposit strengthens your signal in the Intuition
              network.
              <div className="flex flex-row w-full justify-between">
                <Text variant="base" weight="medium">
                  Claim Deposit:
                </Text>
                <Text variant="base" weight="medium" className="text-success">
                  {fees.triplePositionAmount?.toFixed(6)} ETH
                </Text>
              </div>
              <div className="flex flex-row w-full justify-between">
                <Text variant="base" weight="medium">
                  Atom Equity:
                </Text>
                <Text variant="base" weight="medium" className="text-success">
                  {fees.totalAtomPositionAmount?.toFixed(6)} ETH
                </Text>
              </div>
              <Separator />
              <div className="flex flex-row w-full justify-between">
                <Text variant="base" weight="medium">
                  Total Deposits:
                </Text>
                <Text variant="base" weight="medium" className="text-success">
                  {fees.totalPosition?.toFixed(6)} ETH
                </Text>
              </div>
            </div>
          }
        />
      )
    } else if (mode === 'deposit' && modalType === 'identity') {
      return (
        <InfoTooltip
          title="Depositing on an Identity"
          icon={IconName.circleInfo}
          trigger={
            <Icon name={IconName.circleQuestionMark} className="h-5 w-5" />
          }
          content={
            <div className="flex flex-col gap-2 w-full">
              When depositing on an identity, you&apos;re creating a signal that
              improves the identity&apos;s discoverability in the Intuition
              network.
            </div>
          }
        />
      )
    } else if (mode === 'redeem' && modalType === 'identity') {
      return (
        <InfoTooltip
          title="Redeeming from an Identity"
          icon={IconName.circleInfo}
          trigger={
            <Icon name={IconName.circleQuestionMark} className="h-5 w-5" />
          }
          content={
            <div className="flex flex-col gap-2 w-full">
              When redeeming from an identity, you&apos;re withdrawing your
              position. This reduces your signal of support for that user or
              entity in the Intuition network.
            </div>
          }
        />
      )
    } else if (mode === 'redeem' && modalType === 'claim') {
      return (
        <InfoTooltip
          title="Redeeming from a Claim"
          icon={IconName.circleInfo}
          trigger={
            <Icon name={IconName.circleQuestionMark} className="h-5 w-5" />
          }
          content={
            <div className="flex flex-col gap-2 w-full">
              When redeeming from a claim, you&apos;re withdrawing your
              position. This reduces your signal for the claim in the Intuition
              network. Any &apos;atom equity&apos; you hold in the underlying
              identities is separate and can be redeemed independently.
            </div>
          }
        />
      )
    }
    return null
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="justify-between">
          <div className="flex flex-row gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault()
                dispatch({ type: 'START_TRANSACTION' })
              }}
              variant="ghost"
              size="icon"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
            </Button>
            {direction !== undefined && (
              <Tag variant={direction === 'for' ? 'for' : 'against'}>
                {direction === 'for' ? 'FOR' : 'AGAINST'}
              </Tag>
            )}
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-grow flex-col justify-center items-center h-[358px]">
        <div className="flex flex-col justify-center items-center gap-5">
          <Icon name="await-action" className="h-20 w-20 text-neutral-50/30" />
          <div className="gap-5 flex flex-col items-center">
            <div className="flex flex-row items-center gap-2">
              <Text
                variant="headline"
                weight="medium text-white/70 leading-[30x]"
              >
                {mode === 'deposit' ? 'Deposit' : 'Redeem'}{' '}
                {formatDisplayBalance(Number(val), 2)} ETH on{' '}
                {modalType === 'identity' ? 'Identity' : 'Claim'}
              </Text>
              {renderHeadlineInfoTooltip()}
            </div>
            {modalType === 'identity' ? (
              <IdentityTag
                imgSrc={identity?.user?.image ?? identity?.image}
                variant={identity?.user ? Identity.user : Identity.nonUser}
              >
                {identity?.user?.display_name ?? identity?.display_name}
              </IdentityTag>
            ) : (
              <>
                <Claim
                  size="md"
                  subject={{
                    variant: claim?.subject?.is_user
                      ? Identity.user
                      : Identity.nonUser,
                    label: getAtomLabel(claim?.subject as IdentityPresenter),
                    imgSrc: getAtomImage(claim?.subject as IdentityPresenter),
                    id: claim?.subject?.identity_id,
                    description: getAtomDescription(
                      claim?.subject as IdentityPresenter,
                    ),
                    ipfsLink: getAtomIpfsLink(
                      claim?.subject as IdentityPresenter,
                    ),
                    link: getAtomLink(claim?.subject as IdentityPresenter),
                    shouldHover: false,
                  }}
                  predicate={{
                    variant: claim?.predicate?.is_user
                      ? Identity.user
                      : Identity.nonUser,
                    label: getAtomLabel(claim?.predicate as IdentityPresenter),
                    imgSrc: getAtomImage(claim?.predicate as IdentityPresenter),
                    id: claim?.predicate?.identity_id,
                    description: getAtomDescription(
                      claim?.predicate as IdentityPresenter,
                    ),
                    ipfsLink: getAtomIpfsLink(
                      claim?.predicate as IdentityPresenter,
                    ),
                    link: getAtomLink(claim?.predicate as IdentityPresenter),
                    shouldHover: false,
                  }}
                  object={{
                    variant: claim?.object?.is_user
                      ? Identity.user
                      : Identity.nonUser,
                    label: getAtomLabel(claim?.object as IdentityPresenter),
                    imgSrc: getAtomImage(claim?.object as IdentityPresenter),
                    id: claim?.object?.identity_id,
                    description: getAtomDescription(
                      claim?.object as IdentityPresenter,
                    ),
                    ipfsLink: getAtomIpfsLink(
                      claim?.object as IdentityPresenter,
                    ),
                    link: getAtomLink(claim?.object as IdentityPresenter),
                    shouldHover: false,
                  }}
                  maxIdentityLength={12}
                />
              </>
            )}
            <Text
              variant={TextVariant.body}
              weight="normal"
              className="text-neutral-50/50 flex items-center gap-1"
            >
              Estimated Fees: {fees.totalFees.toFixed(4)} ETH{' '}
              <InfoTooltip
                title="Fees"
                icon={IconName.circleInfo}
                content={renderFeeBreakdown()}
              />
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

const FeeBreakdown = ({ label, amount }: { label: string; amount: number }) => (
  <div className="flex flex-row w-full justify-between">
    <Text variant="base" weight="medium">
      {label}:
    </Text>
    <Text variant="base" weight="medium" className="text-destructive">
      {amount.toFixed(6)} ETH
    </Text>
  </div>
)
