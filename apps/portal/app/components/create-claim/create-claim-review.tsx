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

import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { CreateClaimFeesType } from '@routes/resources+/create-claim'
import { TransactionActionType } from 'types/transaction'
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
      <div className="flex flex-col items-center justify-center m-auto">
        <Icon name="await-action" className="h-20 w-20 text-neutral-50/30" />
        <div className="flex flex-col items-center gap-5 mt-5">
          <Text variant="headline" weight="medium" className="text-white/70">
            Review your claim
          </Text>
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
            }}
          />{' '}
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
