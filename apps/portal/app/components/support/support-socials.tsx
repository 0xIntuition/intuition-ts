import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { SupportCard } from '@components/support/support-card'

interface SocialCardData {
  title: string
  link: string
  className?: string
}

interface SocialCardGridProps {
  socialCards: SocialCardData[]
}

export function SocialCardGrid({ socialCards }: SocialCardGridProps) {
  return (
    <div className="flex flex-col gap-6">
      <Text
        variant={TextVariant.headline}
        weight={TextWeight.medium}
        className="text-primary/90"
      >
        Socials
      </Text>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {socialCards.map((card, index) => (
          <SupportCard
            key={index}
            title={card.title}
            link={card.link}
            className={card.className || 'items-center'}
          />
        ))}
      </div>
    </div>
  )
}
