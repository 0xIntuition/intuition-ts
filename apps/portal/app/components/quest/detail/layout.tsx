import { Button, ButtonVariant, Icon, IconName, Text } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

import AudioPlayer from '@components/audio-player'
import { Link } from '@remix-run/react'
import { FALLBACK_QUEST_PLACEHOLDER_IMAGE } from 'app/consts'
import { MDXContentVariant, MDXContentVariantType } from 'app/types'

import MDXContentWrapper from '../mdx-content-wrapper'
import QuestStatusCard from '../quest-status-card'

export interface IHeroProps {
  imgSrc?: string
}

export function Hero({ imgSrc }: IHeroProps) {
  return (
    <img
      src={imgSrc ?? FALLBACK_QUEST_PLACEHOLDER_IMAGE}
      alt={'quest hero'}
      className="object-cover w-full h-[350px] theme-border rounded-b-lg max-sm:h-[200px]"
    />
  )
}

export interface IHeaderProps {
  title?: string | null
  questStatus?: QuestStatus
  position?: number | null
  questAudio?: string | null
}

export function Header({
  title,
  questStatus,
  position,
  questAudio,
}: IHeaderProps) {
  return (
    <div className="flex items-bottom justify-between w-full max-sm:flex-col max-sm:gap-2">
      <div className="flex flex-row gap-4 items-center">
        <Text variant="heading4" weight="medium">
          {position ? `Chapter ${position} : ${title}` : title ?? ''}
        </Text>
        {questAudio && <AudioPlayer audioSrc={questAudio} />}
      </div>
      <QuestStatusCard status={questStatus ?? QuestStatus.NOT_STARTED} />
    </div>
  )
}

export interface MDXContentViewProps {
  body?: string | null
  variant?: MDXContentVariantType
  shouldDisplay?: boolean
}

export function MDXContentView({
  body,
  variant = MDXContentVariant.DEFAULT,
  shouldDisplay = true,
}: MDXContentViewProps) {
  if (!body || !shouldDisplay) {
    return null
  }
  return <MDXContentWrapper code={body} variant={variant} />
}

export interface IQuestBackButtonProps {
  to?: string
}

export function QuestBackButton({
  to = '/app/quest/narrative/0',
}: IQuestBackButtonProps) {
  return (
    <Link to={to} prefetch="intent">
      <Button variant={ButtonVariant.secondary} className="w-fit max-sm:w-full">
        <div className="flex items-center gap-2">
          <Icon name={IconName.arrowLeft} />
        </div>
      </Button>
    </Link>
  )
}
