import {
  Button,
  Claim,
  DialogHeader,
  DialogTitle,
  Icon,
  IconName,
  Identity,
  Text,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { CreateClaimFeesType } from '@routes/resources+/create-claim'
import { TransactionActionType } from 'types/transaction'
import { formatUnits } from 'viem'

interface CreateClaimReviewProps {
  dispatch: (action: TransactionActionType) => void
  selectedIdentities: {
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }
  initialDeposit: string
  fees: CreateClaimFeesType
}

const InfoTooltip: React.FC<{ content: React.ReactNode }> = ({ content }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Icon name={IconName.circleQuestionMark} className="h-4 w-4" />
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const calculateFees = (initialDeposit: string, fees: CreateClaimFeesType) => {
  const epsilon = 1e-18
  const tripleCostDecimal = +formatUnits(BigInt(fees.tripleCost), 18)
  const tripleCreationFeeDecimal = +formatUnits(
    BigInt(fees.tripleCreationFee),
    18,
  )
  const atomFractionOnDepositDecimal =
    +fees.atomDepositFractionOnDeposit / +fees.feeDenominator
  const atomFractionDistributionOnDepositDecimal =
    atomFractionOnDepositDecimal * +initialDeposit + tripleCreationFeeDecimal
  const atomFractionDistributionOnCreationDecimal = formatUnits(
    BigInt(fees.atomDepositFractionOnCreation),
    18,
  )

  return {
    totalFees:
      +initialDeposit > epsilon
        ? atomFractionDistributionOnDepositDecimal + tripleCreationFeeDecimal
        : tripleCostDecimal,
    atomFractionDistribution:
      +initialDeposit > epsilon
        ? atomFractionDistributionOnDepositDecimal.toFixed(4)
        : atomFractionDistributionOnCreationDecimal,
    tripleCreationFee: formatBalance(fees.tripleCreationFee, 18, 4),
  }
}

const CreateClaimReview: React.FC<CreateClaimReviewProps> = ({
  dispatch,
  selectedIdentities,
  initialDeposit,
  fees,
}) => {
  const { totalFees, atomFractionDistribution, tripleCreationFee } =
    calculateFees(initialDeposit, fees)

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
      <div className="flex flex-col items-center justify-center h-[358px]">
        <Icon name="await-action" className="h-20 w-20 text-neutral-50/30" />
        <div className="flex flex-col items-center gap-5 mt-5">
          <Text variant="headline" weight="medium" className="text-white/70">
            Review your claim
          </Text>
          <Claim
            subject={{
              imgSrc:
                selectedIdentities.subject?.user?.image ??
                selectedIdentities.subject?.image,
              label:
                selectedIdentities.subject?.user?.display_name ??
                selectedIdentities.subject?.display_name ??
                '',
              variant: selectedIdentities.subject?.user
                ? Identity.user
                : Identity.nonUser,
            }}
            predicate={{
              imgSrc: selectedIdentities.predicate?.image,
              label: selectedIdentities.predicate?.display_name ?? '',
            }}
            object={{
              imgSrc:
                selectedIdentities.object?.user?.image ??
                selectedIdentities.object?.image,
              label:
                selectedIdentities.object?.user?.display_name ??
                selectedIdentities.object?.display_name ??
                '',
              variant: selectedIdentities.object?.user
                ? Identity.user
                : Identity.nonUser,
            }}
          />
          <Text
            variant="base"
            weight="normal"
            className="text-neutral-50/50 flex items-center gap-1"
          >
            Estimated Fees: {totalFees.toFixed(4)} ETH
            <InfoTooltip
              content={
                <div className="flex flex-col gap-2">
                  <Text variant="base" weight="medium">
                    Triple Creation Fee: {tripleCreationFee} ETH
                  </Text>
                  <Text variant="base" weight="medium">
                    Atom Deposit Fraction: {atomFractionDistribution} ETH
                  </Text>
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
