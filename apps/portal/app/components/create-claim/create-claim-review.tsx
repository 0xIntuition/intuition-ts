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
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, PATHS } from 'consts'
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
            subject={{
              variant: selectedIdentities.subject?.is_user
                ? Identity.user
                : Identity.nonUser,
              label:
                selectedIdentities.subject?.user?.display_name ??
                selectedIdentities.subject?.display_name ??
                selectedIdentities.subject?.identity_id ??
                '',
              imgSrc: selectedIdentities.subject?.is_user
                ? selectedIdentities.subject?.user?.image
                : selectedIdentities.subject?.image,
              id: selectedIdentities.subject?.identity_id,
              description: selectedIdentities.subject?.is_user
                ? selectedIdentities.subject?.user?.description
                : selectedIdentities.subject?.description,
              ipfsLink:
                selectedIdentities.subject?.is_user === true
                  ? `${BLOCK_EXPLORER_URL}/address/${selectedIdentities.subject?.identity_id}`
                  : `${IPFS_GATEWAY_URL}/${selectedIdentities.subject?.identity_id?.replace('ipfs://', '')}`,
              link:
                selectedIdentities.subject?.is_user === true
                  ? `${PATHS.PROFILE}/${selectedIdentities.subject?.identity_id}`
                  : `${PATHS.IDENTITY}/${selectedIdentities.subject?.identity_id?.replace('ipfs://', '')}`,
            }}
            predicate={{
              variant: selectedIdentities.predicate?.is_user
                ? 'user'
                : 'non-user',
              label:
                selectedIdentities.predicate?.user?.display_name ??
                selectedIdentities.predicate?.display_name ??
                selectedIdentities.predicate?.identity_id ??
                '',
              imgSrc: selectedIdentities.predicate?.is_user
                ? selectedIdentities.predicate?.user?.image
                : selectedIdentities.predicate?.image,
              id: selectedIdentities.predicate?.identity_id,
              description: selectedIdentities.predicate?.is_user
                ? selectedIdentities.predicate?.user?.description
                : selectedIdentities.predicate?.description,
              ipfsLink:
                selectedIdentities.predicate?.is_user === true
                  ? `${BLOCK_EXPLORER_URL}/address/${selectedIdentities.predicate?.identity_id}`
                  : `${IPFS_GATEWAY_URL}/${selectedIdentities.predicate?.identity_id?.replace('ipfs://', '')}`,
              link:
                selectedIdentities.predicate?.is_user === true
                  ? `${PATHS.PROFILE}/${selectedIdentities.predicate?.identity_id}`
                  : `${PATHS.IDENTITY}/${selectedIdentities.predicate?.identity_id?.replace('ipfs://', '')}`,
            }}
            object={{
              variant: selectedIdentities.object?.is_user ? 'user' : 'non-user',
              label:
                selectedIdentities.object?.user?.display_name ??
                selectedIdentities.object?.display_name ??
                selectedIdentities.object?.identity_id ??
                '',
              imgSrc: selectedIdentities.object?.is_user
                ? selectedIdentities.object?.user?.image
                : selectedIdentities.object?.image,
              id: selectedIdentities.object?.identity_id,
              description: selectedIdentities.object?.is_user
                ? selectedIdentities.object?.user?.description
                : selectedIdentities.object?.description,
              ipfsLink:
                selectedIdentities.object?.is_user === true
                  ? `${BLOCK_EXPLORER_URL}/address/${selectedIdentities.object?.identity_id}`
                  : `${IPFS_GATEWAY_URL}/${selectedIdentities.object?.identity_id?.replace('ipfs://', '')}`,
              link:
                selectedIdentities.object?.is_user === true
                  ? `${PATHS.PROFILE}/${selectedIdentities.object?.identity_id}`
                  : `${PATHS.IDENTITY}/${selectedIdentities.object?.identity_id?.replace('ipfs://', '')}`,
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
