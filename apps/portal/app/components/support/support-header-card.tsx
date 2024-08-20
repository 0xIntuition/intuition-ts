import {
  Button,
  ButtonVariant,
  Icon,
  IconName,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import { STANDARD_QUEST_SET } from 'app/consts'

interface SupportHeaderCardProps {
  title: string
  subtitle?: string
  content: string
  ctaText: string
  link: string
}

export function SupportHeaderCard({
  title,
  subtitle,
  content,
  ctaText,
  link,
}: SupportHeaderCardProps) {
  return (
    <div className="flex flex-row justify-between rounded-xl theme-border bg-gradient-to-l from-accent/30 mb-6">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-start">
          <div className="flex-col gap-1">
            {subtitle && (
              <Text
                variant={TextVariant.caption}
                className="text-foreground/70"
              >
                {subtitle}
              </Text>
            )}
            <Text variant={TextVariant.bodyLarge}>{title}</Text>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Text
            variant={TextVariant.caption}
            className="text-secondary-foreground"
          >
            {content}
          </Text>
          <a href={link}>
            <Button variant={ButtonVariant.secondary}>
              <Icon name={IconName.crystalBall} className="h-4 w-4" /> {ctaText}
            </Button>
          </a>
        </div>
      </div>
      <img
        src={`${STANDARD_QUEST_SET.imgSrc}-header`}
        alt={title}
        className="object-cover h-full w-2/5 rounded-r-lg theme-border max-sm:w-full max-sm:rounded-r-lg max-sm:h-44"
      />
    </div>
  )
}
