import {
  StakeholdersList,
  Text,
  TextVariant,
  TextWeight,
  Trunctacular,
} from '..'

interface FeaturedListCardProps {
  displayName: string
  imgSrc?: string
  identitiesCount?: number
  tvl?: string
  holdersCount?: number
  stakeholders?: Array<{
    name: string
    avatar?: string
  }>
}

const FeaturedListCard: React.FC<FeaturedListCardProps> = ({
  displayName,
  imgSrc,
  identitiesCount,
  tvl,
  holdersCount,
  stakeholders,
}) => {
  return (
    <div className="relative h-[360px] w-[530px] flex flex-col overflow-hidden gap-3 p-5 text-left bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 hover:border-primary/50 hover:cursor-pointer transition-all duration-300">
      <div>
        <Trunctacular
          value={displayName}
          variant={TextVariant.headline}
          weight={TextWeight.medium}
          className="text-left text-secondary"
          maxStringLength={40}
        />
        <div className="flex gap-6 text-secondary/70">
          <Text variant={TextVariant.body} className="text-secondary/70">
            {identitiesCount} identities
          </Text>
          <Text variant={TextVariant.body} className="text-secondary/70">
            TVL {tvl} ETH
          </Text>
          <Text variant={TextVariant.body} className="text-secondary/70">
            {holdersCount} Holders
          </Text>
        </div>
      </div>
      <div className="relative h-[222px] w-full">
        <img
          src={imgSrc}
          alt={displayName}
          className="h-full w-full object-cover rounded-xl"
        />
      </div>

      {stakeholders && stakeholders.length > 0 && (
        <StakeholdersList stakeholders={stakeholders || []} />
      )}
    </div>
  )
}

export { FeaturedListCard }
