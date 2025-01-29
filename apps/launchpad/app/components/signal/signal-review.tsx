import { useEffect, useState } from 'react'

import {
  ActivePositionCard,
  Claim,
  Icon,
  IconName,
  Identity,
  IdentityTag,
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { InfoTooltip } from '@components/info-tooltip'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/helpers'
import { Link } from '@remix-run/react'
import { AtomType, TripleType, VaultDetailsType } from 'app/types'
import { TransactionStateType } from 'app/types/transaction'

interface SignalReviewProps {
  val: string
  mode: string | undefined
  state: TransactionStateType
  isError?: boolean
  modalType: 'atom' | 'triple' | null | undefined
  triple?: TripleType
  atom?: AtomType
  vaultDetails?: VaultDetailsType
}

const calculateDepositFees = (
  val: string,
  isClaim: boolean,
  vaultDetails?: VaultDetailsType,
) => {
  const protocolFee = vaultDetails?.formatted_protocol_fee || 0
  const entryFee = vaultDetails?.formatted_entry_fee || 0
  const atomFractionOnDeposit =
    vaultDetails?.formatted_atom_deposit_fraction_for_triple || 0

  // Protocol Fee
  const protocolFeeAmount = +val * +protocolFee
  const valAfterProtocolFee = +val - protocolFeeAmount

  // Atom Deposit Flow
  const atomDepositAmount = isClaim
    ? valAfterProtocolFee * +atomFractionOnDeposit
    : valAfterProtocolFee
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

const calculateRedeemFees = (val: string, vaultDetails?: VaultDetailsType) => {
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

export default function SignalReview({
  val,
  mode = 'atom',
  state,
  isError,
  triple,
  atom,
  vaultDetails,
}: SignalReviewProps) {
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
      ? calculateDepositFees(val, !!triple, vaultDetails)
      : calculateRedeemFees(val, vaultDetails)

  return (
    <ScrollArea className="h-[600px] w-full">
      <div className="flex flex-col px-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center justify-center">
            <Icon name="await-action" className="h-12 w-12 text-muted" />
            <Text variant={TextVariant.headline} weight={TextWeight.medium}>
              Review
            </Text>
          </div>
          <ActivePositionCard label="Total Cost" value={Number(val)} />
          <div className="gap-10 flex flex-col w-full">
            <div className="flex flex-col gap-2.5 w-full">
              <div className="flex flex-row gap-1">
                <Text
                  variant={TextVariant.bodyLarge}
                  weight={TextWeight.medium}
                >
                  {mode === 'deposit'
                    ? `Deposit ETH on ${triple ? 'Triple' : 'Atom'}`
                    : `Redeem ETH from ${triple ? 'Triple' : 'Atom'}`}
                </Text>
              </div>
              <Table className="border-transparent">
                <TableBody className="border-border/20 border-t border-b">
                  <TableRow className="hover:bg-transparent">
                    <TableCell>
                      {triple ? (
                        <Claim
                          size="default"
                          subject={{
                            variant:
                              triple?.subject?.type === ('Account' || 'Default')
                                ? Identity.user
                                : Identity.nonUser,
                            label: getAtomLabel(triple?.subject),
                            imgSrc: getAtomImage(triple?.subject),
                            id: triple?.subject?.id.toString(),
                            description: getAtomDescription(triple?.subject),
                            ipfsLink: getAtomIpfsLink(triple?.subject),
                            link: getAtomLink(triple?.subject),
                          }}
                          predicate={{
                            variant:
                              triple?.predicate?.type ===
                              ('Account' || 'Default')
                                ? Identity.user
                                : Identity.nonUser,
                            label: getAtomLabel(triple?.predicate),
                            imgSrc: getAtomImage(triple?.predicate),
                            id: triple?.predicate?.id.toString(),
                            description: getAtomDescription(triple?.predicate),
                            ipfsLink: getAtomIpfsLink(triple?.predicate),
                            link: getAtomLink(triple?.predicate),
                          }}
                          object={{
                            variant:
                              triple?.object?.type === ('Account' || 'Default')
                                ? Identity.user
                                : Identity.nonUser,
                            label: getAtomLabel(triple?.object),
                            imgSrc: getAtomImage(triple?.object),
                            id: triple?.object?.id.toString(),
                            description: getAtomDescription(triple?.object),
                            ipfsLink: getAtomIpfsLink(triple?.object),
                            link: getAtomLink(triple?.object),
                          }}
                          orientation="vertical"
                        />
                      ) : (
                        <IdentityTag
                          imgSrc={atom?.image}
                          variant={
                            atom?.type === ('Account' || 'Default')
                              ? Identity.user
                              : Identity.nonUser
                          }
                        >
                          {atom?.label ?? 'Unknown'}
                        </IdentityTag>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Text
                        variant={TextVariant.body}
                        weight={TextWeight.medium}
                        className="text-secondary-foreground/70"
                      >
                        {mode === 'deposit'
                          ? triple
                            ? fees.triplePositionAmount
                            : fees.totalAtomPositionAmount?.toFixed(6)
                          : fees.totalRedeem?.toFixed(6)}{' '}
                        ETH
                      </Text>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            {mode === 'deposit' && triple && (
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-row gap-1">
                  <Text
                    variant={TextVariant.bodyLarge}
                    weight={TextWeight.medium}
                  >
                    ETH to Individual Identities
                  </Text>
                  <InfoTooltip
                    title="ETH to Individual Identities"
                    icon={IconName.circleInfo}
                    content={
                      <div className="flex flex-col gap-2 w-full">
                        <Text variant="base">
                          When staking on a Claim, a portion of the deposit
                          amount is automatically allocated to each underlying
                          Identity, as there is an indirect signaling of support
                          of these Identities.
                        </Text>
                      </div>
                    }
                  />
                </div>
                <Table className="border-transparent">
                  <TableBody className="border-border/20 border-t border-b">
                    <TableRow className="hover:bg-transparent">
                      <TableCell>
                        <IdentityTag
                          size="default"
                          variant={
                            triple?.subject?.type === ('Account' || 'Default')
                              ? Identity.user
                              : Identity.nonUser
                          }
                          imgSrc={getAtomImage(triple?.subject)}
                          id={triple?.subject?.id.toString()}
                        >
                          {getAtomLabel(triple?.subject)}
                        </IdentityTag>
                      </TableCell>
                      <TableCell className="text-right">
                        <Text
                          variant={TextVariant.body}
                          weight={TextWeight.medium}
                          className="text-secondary-foreground/70"
                        >
                          {fees.atomDepositAmount?.toFixed(6)} ETH
                        </Text>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell>
                        <IdentityTag
                          size="default"
                          variant={
                            triple?.predicate?.type === ('Account' || 'Default')
                              ? Identity.user
                              : Identity.nonUser
                          }
                          imgSrc={getAtomImage(triple?.predicate)}
                          id={triple?.predicate?.id.toString()}
                        >
                          {getAtomLabel(triple?.predicate)}
                        </IdentityTag>
                      </TableCell>
                      <TableCell className="text-right">
                        <Text
                          variant={TextVariant.body}
                          weight={TextWeight.medium}
                          className="text-secondary-foreground/70"
                        >
                          {fees.atomDepositAmount?.toFixed(6)} ETH
                        </Text>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell>
                        <IdentityTag
                          size="default"
                          variant={
                            triple?.object?.type === ('Account' || 'Default')
                              ? Identity.user
                              : Identity.nonUser
                          }
                          imgSrc={getAtomImage(triple?.object)}
                          id={triple?.object?.id.toString()}
                        >
                          {getAtomLabel(triple?.object)}
                        </IdentityTag>
                      </TableCell>
                      <TableCell className="text-right">
                        <Text
                          variant={TextVariant.body}
                          weight={TextWeight.medium}
                          className="text-secondary-foreground/70"
                        >
                          {fees.atomDepositAmount?.toFixed(6)} ETH
                        </Text>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-row gap-1">
                <Text
                  variant={TextVariant.bodyLarge}
                  weight={TextWeight.medium}
                >
                  Estimated Fees
                </Text>
                <InfoTooltip
                  title="Estimated Fees"
                  icon={IconName.circleInfo}
                  content={
                    <div className="flex flex-col gap-2 w-full">
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
                    </div>
                  }
                />
              </div>
              <Table className="border-transparent">
                <TableBody className="border-border/20 border-t border-b">
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="text-secondary-foreground/70">
                      Protocol Fee
                    </TableCell>
                    <TableCell className="text-right">
                      <Text
                        variant={TextVariant.body}
                        weight={TextWeight.medium}
                        className="text-secondary-foreground/70"
                      >
                        {fees.protocolFeeAmount.toFixed(6)} ETH
                      </Text>
                    </TableCell>
                  </TableRow>
                  {mode === 'deposit' ? (
                    <>
                      <TableRow className="hover:bg-transparent">
                        <TableCell className="text-secondary-foreground/70">
                          Identity Entry Fee
                        </TableCell>
                        <TableCell className="text-right">
                          <Text
                            variant={TextVariant.body}
                            weight={TextWeight.medium}
                            className="text-secondary-foreground/70"
                          >
                            {fees.totalAtomEntryFeeAmount?.toFixed(6)} ETH
                          </Text>
                        </TableCell>
                      </TableRow>
                      {triple && (
                        <TableRow className="hover:bg-transparent">
                          <TableCell className="text-secondary-foreground/70">
                            Claim Entry Fee
                          </TableCell>
                          <TableCell className="text-right">
                            <Text
                              variant={TextVariant.body}
                              weight={TextWeight.medium}
                              className="text-secondary-foreground/70"
                            >
                              {fees.tripleEntryFeeAmount?.toFixed(6)} ETH
                            </Text>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ) : (
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-secondary-foreground/70">
                        Exit Fee
                      </TableCell>
                      <TableCell className="text-right">
                        <Text
                          variant={TextVariant.body}
                          weight={TextWeight.medium}
                          className="text-secondary-foreground/70"
                        >
                          {fees.exitFeeAmount?.toFixed(6)} ETH
                        </Text>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
