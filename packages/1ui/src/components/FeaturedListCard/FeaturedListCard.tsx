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
    <div className="relative w-full flex flex-col overflow-hidden gap-3 p-5 text-left bg-primary/5 border border-primary/10 rounded-2xl hover:bg-primary/10 hover:border-primary/50 hover:cursor-pointer transition-all duration-300 max-w-[400px] md:max-w-none">
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
          {tvl && (
            <Text variant={TextVariant.body} className="text-secondary/70">
              TVL {tvl} ETH
            </Text>
          )}
          {holdersCount && (
            <Text variant={TextVariant.body} className="text-secondary/70">
              {holdersCount} Holders
            </Text>
          )}
        </div>
      </div>
      <div className="relative h-[222px] w-full">
        <img
          src={imgSrc}
          alt={displayName}
          className="h-full object-cover rounded-xl aspect-video"
        />
      </div>

      {stakeholders && stakeholders.length > 0 && (
        <StakeholdersList stakeholders={stakeholders || []} />
      )}
    </div>
  )
}

export { FeaturedListCard }
