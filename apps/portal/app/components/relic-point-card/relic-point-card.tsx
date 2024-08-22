import {
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import NavigationButton from '@components/navigation-link'
import { ReferralPointsDisplay } from '@components/referral-card/referral-points-display'
import RelicCard from '@components/relic-card/relic-card'

export default function RelicPointCard({
  relicsMintCount,
  relicsHoldCount,
  relicsPoints,
}: {
  relicsMintCount: number
  relicsHoldCount: number
  relicsPoints: number
  className?: string
}) {
  return (
    <div className="rounded-lg theme-border p-5 flex flex-col md:flex-row items-start gap-5 w-full">
      <RelicCard
        variant={'v2'}
        className="w-fit h-fit mx-auto md:h-[250px] md:w-[250px]"
      />
      <div className="flex flex-row w-full">
        <div className="flex flex-col gap-5 w-2/3 justify-between">
          <Text variant={TextVariant.headline} weight={TextWeight.semibold}>
            Relics by Intuition
          </Text>
          <Text className="italic text-secondary-foreground text-sm">
            Holding this relic, you feel an otherworldly connection... As if the
            secrets of the past and future are within your grasp...
          </Text>
          <Text className="text-secondary-foreground text-base w-full">
            The Relic, a key to the unseen realms. Its bearer walks the paths of
            Intuition&apos;s Beta. Seek your own: forge it in the fires of
            creation.
          </Text>
          <NavigationButton
            to={'https://intuition.church'}
            target="_blank"
            variant={ButtonVariant.secondary}
            size={ButtonSize.md}
            className="w-full md:w-fit"
          >
            <Icon name={IconName.circle} className="h-4 w-4" />
            Visit Intuition.Church
          </NavigationButton>
        </div>
        <div className="flex flex-col gap-5 w-1/3">
          <ReferralPointsDisplay
            points={relicsMintCount}
            label="Relics Minted"
          />
          <ReferralPointsDisplay points={relicsHoldCount} label="Relics Held" />
          <ReferralPointsDisplay points={relicsPoints} label="Relics Points" />
        </div>
      </div>
    </div>
  )
}
