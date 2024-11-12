import {
  ActivePositionCard,
  Icon,
  IconName,
  Identity,
  IdentityTag,
  ProfileCard,
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
import { PATHS } from '@consts/paths'
import { formatBalance } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { CreateLoaderData } from '@routes/resources+/create'
import { IdentityTransactionActionType } from 'app/types'
import { formatUnits } from 'viem'

interface CreateIdentityReviewProps {
  dispatch: (action: IdentityTransactionActionType) => void
  identity: {
    imageUrl?: string | null
    displayName?: string
    description?: string
    externalReference?: string
    initialDeposit?: string
  }
  initialDeposit: string
  fees: CreateLoaderData
}

const calculateFees = (initialDeposit: string, fees: CreateLoaderData) => {
  const epsilon = 1e-18
  const atomCostDecimal = +formatUnits(BigInt(fees.atomCost), 18)
  // const atomCreationFeeDecimal = +formatUnits(BigInt(fees.atomCreationFee), 18)

  return {
    totalFees:
      +initialDeposit > epsilon
        ? +initialDeposit + atomCostDecimal
        : atomCostDecimal,
    atomCreationFee: +formatBalance(fees.atomCreationFee, 18),
  }
}

const CreateIdentityReview: React.FC<CreateIdentityReviewProps> = ({
  identity,
  initialDeposit,
  fees,
}) => {
  const { totalFees } = calculateFees(initialDeposit, fees)

  return (
    <>
      <ScrollArea className="h-[600px] w-full">
        <div className="flex flex-col px-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5 items-center justify-center">
              <Icon name="await-action" className="h-12 w-12 text-muted" />
              <Text variant={TextVariant.headline} weight={TextWeight.medium}>
                Review
              </Text>
              <div className="p-6 rounded-xl theme-border flex">
                <ProfileCard
                  variant={Identity.nonUser}
                  avatarSrc={identity?.imageUrl ?? ''}
                  name={identity?.displayName ?? ''}
                  bio={identity?.description ?? ''}
                  id={''}
                  externalLink={identity?.externalReference ?? ''}
                />
              </div>
            </div>
            <ActivePositionCard label="Total Cost" value={totalFees} />
            <div className="gap-10 flex flex-col w-full">
              <div className="flex flex-col gap-2.5 w-full">
                <div className="flex flex-row gap-1">
                  <Text
                    variant={TextVariant.bodyLarge}
                    weight={TextWeight.medium}
                  >
                    Deposit ETH on Identity
                  </Text>
                </div>
                <Table className="border-transparent">
                  <TableBody className="border-border/20 border-t border-b">
                    <TableRow className="hover:bg-transparent">
                      <TableCell>
                        <IdentityTag
                          imgSrc={identity?.imageUrl}
                          variant={Identity.nonUser}
                        >
                          {identity.displayName}
                        </IdentityTag>
                      </TableCell>
                      <TableCell className="text-right">
                        <Text
                          variant={TextVariant.body}
                          weight={TextWeight.medium}
                          className="text-secondary-foreground/70"
                        >
                          {initialDeposit === '' ? '0' : initialDeposit} ETH
                        </Text>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
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
                    <>
                      <TableRow className="hover:bg-transparent">
                        <TableCell className="text-secondary-foreground/70">
                          AtomCost
                        </TableCell>
                        <TableCell className="text-right">
                          <Text
                            variant={TextVariant.body}
                            weight={TextWeight.medium}
                            className="text-secondary-foreground/70"
                          >
                            {formatUnits(BigInt(fees.atomCost), 18)} ETH
                          </Text>
                        </TableCell>
                      </TableRow>
                    </>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

export default CreateIdentityReview
