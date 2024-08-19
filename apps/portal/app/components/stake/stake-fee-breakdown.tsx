import { IconName, Separator, Text } from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { InfoTooltip } from '@components/info-tooltip'
import { Link } from '@remix-run/react'
import { PATHS } from 'app/consts'

export interface Fees {
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

export const FeeBreakdown = ({
  label,
  amount,
}: {
  label: string
  amount: number
}) => (
  <div className="flex flex-row w-full justify-between">
    <Text variant="base" weight="medium">
      {label}:
    </Text>
    <Text variant="base" weight="medium" className="text-destructive">
      {amount.toFixed(6)} ETH
    </Text>
  </div>
)

export const FeeBreakdownTooltip = ({
  fees,
  mode,
  claim,
  identity,
}: {
  fees: Fees
  mode: string
  claim?: ClaimPresenter
  identity?: IdentityPresenter
}) => (
  <InfoTooltip
    title="Fees"
    icon={IconName.circleInfo}
    content={
      <div className="flex flex-col gap-2 w-full">
        <StandardFees />
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
    }
  />
)

export const StandardFees = () => {
  return (
    <Text variant="base">
      Standard fees apply to this transaction. See{' '}
      <Link
        to={PATHS.HELP}
        target="_blank"
        prefetch="intent"
        className="underline"
      >
        Help Center
      </Link>{' '}
      for details.
    </Text>
  )
}
