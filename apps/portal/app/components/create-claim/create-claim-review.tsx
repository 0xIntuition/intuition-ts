import {
  Button,
  Claim,
  DialogHeader,
  DialogTitle,
  Icon,
  IconName,
  Identity,
  Separator,
  Text,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { InfoTooltip } from '@components/info-tooltip'
import { StandardFees } from '@components/stake/stake-fee-breakdown'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { CreateClaimFeesType } from '@routes/resources+/create-claim'
import { TransactionActionType } from 'app/types/transaction'
import { formatUnits } from 'viem'

interface CreateClaimReviewProps {
  dispatch: (action: TransactionActionType) => void
  selectedIdentities: {
    subject?: IdentityPresenter | null
    predicate?: IdentityPresenter | null
    object?: IdentityPresenter | null
  }
  initialDeposit: string
  fees: CreateClaimFeesType
}

const calculateCreationFees = (val: string, fees: CreateClaimFeesType) => {
  const tripleCost = +formatUnits(BigInt(fees.tripleCost ?? 0), 18)
  const tripleCreationFee = +formatUnits(
    BigInt(fees.tripleCreationFee ?? 0),
    18,
  )
  const ghostShares = 0.000000000002
  const protocolFee = +formatUnits(BigInt(fees.protocolFee ?? 0), 18)
  const entryFee = +formatUnits(BigInt(fees.entryFee ?? 0), 18)
  const atomFractionOnDeposit = +formatUnits(
    BigInt(fees?.atomDepositFractionOnDeposit ?? 0),
    18,
  )
  const atomFractionOnCreation = +formatUnits(
    BigInt(fees?.atomDepositFractionOnCreation ?? 0),
    18,
  )
  const feeDenominator = +formatUnits(BigInt(fees.feeDenominator ?? 0), 18)

  const depositAmount = +val > tripleCost ? +val + tripleCost : tripleCost

  // Protocol Fee
  const protocolFeeAmount = depositAmount * (protocolFee / feeDenominator)

  // Triple Creation Fee
  const tripleCreationFeeAmount = tripleCreationFee

  // Remaining amount for deposit
  const remainingDeposit =
    depositAmount - protocolFeeAmount - tripleCreationFeeAmount

  // Atom Deposit Flow
  const atomDepositAmount =
    +val > 0
      ? remainingDeposit * (atomFractionOnDeposit / feeDenominator)
      : atomFractionOnCreation
  const atomEntryFeeAmount = atomDepositAmount * (entryFee / feeDenominator)
  const atomPositionAmount = atomDepositAmount - atomEntryFeeAmount

  // Triple Deposit Flow
  const tripleDepositAmount =
    +val > tripleCost ? remainingDeposit - atomDepositAmount : 0
  const triplePositionAmount = +val > tripleCost ? tripleDepositAmount : 0 // No entry fee for triple deposit at creation

  // Total Fees
  const totalFees =
    +val > 0
      ? protocolFeeAmount +
        tripleCreationFeeAmount +
        atomEntryFeeAmount +
        ghostShares
      : tripleCreationFeeAmount + atomFractionOnDeposit + ghostShares

  return {
    totalFees,
    tripleCost,
    tripleCreationFee: tripleCreationFeeAmount,
    protocolFeeAmount,
    atomDepositAmount,
    atomEntryFeeAmount: atomEntryFeeAmount / 3, // Per atom
    totalAtomEntryFeeAmount: atomEntryFeeAmount,
    tripleEntryFeeAmount: 0, // No entry fee for triple at creation
    atomPositionAmount: atomPositionAmount / 3, // Per atom
    totalAtomPositionAmount: atomDepositAmount,
    triplePositionAmount,
    totalPosition: triplePositionAmount + atomPositionAmount,
  }
}

const CreateClaimReview: React.FC<CreateClaimReviewProps> = ({
  dispatch,
  selectedIdentities,
  initialDeposit,
  fees,
}) => {
  const {
    totalFees,
    triplePositionAmount,
    totalAtomPositionAmount,
    totalPosition,
    tripleCreationFee,
    totalAtomEntryFeeAmount,
    protocolFeeAmount,
  } = calculateCreationFees(initialDeposit, fees)

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <Button
            onClick={() => dispatch({ type: 'START_TRANSACTION' })}
            variant="ghost"
            size="icon"
          >
            <Icon name="arrow-left" className="h-4 w-4" />
          </Button>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center m-auto">
        <Icon name="await-action" className="h-20 w-20 text-neutral-50/30" />
        <div className="flex flex-col items-center gap-5 mt-5">
          <div className="flex flex-row items-center gap-2">
            <Text variant="headline" weight="medium" className="text-white/70">
              Review your claim
            </Text>
            {+initialDeposit > 0 && (
              <InfoTooltip
                title="Depositing on a Claim"
                icon={IconName.circleInfo}
                trigger={
                  <Icon
                    name={IconName.circleQuestionMark}
                    className="h-5 w-5"
                  />
                }
                content={
                  <div className="flex flex-col gap-2 w-full">
                    <Text variant="base">
                      When depositing on a Claim, a portion of the deposit
                      amount is automatically allocated to each underlying
                      Identity, as there is an indirect signaling of support of
                      these Identities.
                    </Text>
                    <div className="flex flex-row w-full justify-between">
                      <Text variant="base" weight="medium">
                        Claim Deposit:
                      </Text>
                      <Text
                        variant="base"
                        weight="medium"
                        className="text-success"
                      >
                        {triplePositionAmount?.toFixed(6)} ETH
                      </Text>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                      <Text variant="base" weight="medium">
                        Atom Equity:
                      </Text>
                      <Text
                        variant="base"
                        weight="medium"
                        className="text-success"
                      >
                        {totalAtomPositionAmount?.toFixed(6)} ETH
                      </Text>
                    </div>
                    <Separator />
                    <div className="flex flex-row w-full justify-between">
                      <Text variant="base" weight="medium">
                        Total Deposits:
                      </Text>
                      <Text
                        variant="base"
                        weight="medium"
                        className="text-success"
                      >
                        {totalPosition?.toFixed(6)} ETH
                      </Text>
                    </div>
                  </div>
                }
              />
            )}
          </div>
          <Claim
            size="md"
            subject={{
              variant: selectedIdentities.subject?.is_user
                ? Identity.user
                : Identity.nonUser,
              label: getAtomLabel(
                selectedIdentities.subject as IdentityPresenter,
              ),
              imgSrc: getAtomImage(
                selectedIdentities.subject as IdentityPresenter,
              ),
              id: selectedIdentities.subject?.identity_id,
              description: getAtomDescription(
                selectedIdentities.subject as IdentityPresenter,
              ),
              ipfsLink: getAtomIpfsLink(
                selectedIdentities.subject as IdentityPresenter,
              ),
              link: getAtomLink(
                selectedIdentities.subject as IdentityPresenter,
              ),
              shouldHover: false,
            }}
            predicate={{
              variant: selectedIdentities.predicate?.is_user
                ? Identity.user
                : Identity.nonUser,
              label: getAtomLabel(
                selectedIdentities.predicate as IdentityPresenter,
              ),
              imgSrc: getAtomImage(
                selectedIdentities.predicate as IdentityPresenter,
              ),
              id: selectedIdentities.predicate?.identity_id,
              description: getAtomDescription(
                selectedIdentities.predicate as IdentityPresenter,
              ),
              ipfsLink: getAtomIpfsLink(
                selectedIdentities.predicate as IdentityPresenter,
              ),
              link: getAtomLink(
                selectedIdentities.predicate as IdentityPresenter,
              ),
              shouldHover: false,
            }}
            object={{
              variant: selectedIdentities.object?.is_user
                ? Identity.user
                : Identity.nonUser,
              label: getAtomLabel(
                selectedIdentities.object as IdentityPresenter,
              ),
              imgSrc: getAtomImage(
                selectedIdentities.object as IdentityPresenter,
              ),
              id: selectedIdentities.object?.identity_id,
              description: getAtomDescription(
                selectedIdentities.object as IdentityPresenter,
              ),
              ipfsLink: getAtomIpfsLink(
                selectedIdentities.object as IdentityPresenter,
              ),
              link: getAtomLink(selectedIdentities.object as IdentityPresenter),
              shouldHover: false,
            }}
            maxIdentityLength={16}
          />
          <Text
            variant="base"
            weight="normal"
            className="text-neutral-50/50 flex items-center gap-1"
          >
            Estimated Fees: {totalFees.toFixed(4)} ETH
            <InfoTooltip
              title="Creating a Claim"
              icon={IconName.circleInfo}
              trigger={
                <Icon name={IconName.circleQuestionMark} className="h-5 w-5" />
              }
              content={
                <div className="flex flex-col gap-2 w-full">
                  <StandardFees />
                  {+initialDeposit > 0 && (
                    <div className="flex flex-row w-full justify-between">
                      <Text variant="base" weight="medium">
                        Protocol Fee:
                      </Text>
                      <Text
                        variant="base"
                        weight="medium"
                        className="text-destructive"
                      >
                        {protocolFeeAmount?.toFixed(6)} ETH
                      </Text>
                    </div>
                  )}
                  <div className="flex flex-row w-full justify-between">
                    <Text variant="base" weight="medium">
                      Claim Creation Fee:
                    </Text>
                    <Text
                      variant="base"
                      weight="medium"
                      className="text-destructive"
                    >
                      {tripleCreationFee?.toFixed(6)} ETH
                    </Text>
                  </div>
                  {+initialDeposit > 0 && (
                    <div className="flex flex-row w-full justify-between">
                      <Text variant="base" weight="medium">
                        Identity Entry Fees:
                      </Text>
                      <Text
                        variant="base"
                        weight="medium"
                        className="text-destructive"
                      >
                        {totalAtomEntryFeeAmount?.toFixed(6)} ETH
                      </Text>
                    </div>
                  )}
                  <Separator />
                  <div className="flex flex-row w-full justify-between">
                    <Text variant="base" weight="medium">
                      Estimated Total Fees:
                    </Text>
                    <Text
                      variant="base"
                      weight="medium"
                      className="text-destructive"
                    >
                      {totalFees?.toFixed(6)} ETH
                    </Text>
                  </div>
                </div>
              }
            />
          </Text>
        </div>
      </div>
    </>
  )
}

export default CreateClaimReview
