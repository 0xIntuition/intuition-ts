import { useEffect, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import {
  GetQuestResponse,
  GetUserQuestByIdResponse,
  QuestStatus,
} from '@0xintuition/api'

import { QuestStatusIndicator } from '@components/quest/quest-status-indicator'
import {
  getNextQuestRouteId,
  getQuestId,
  QuestRouteIdType,
} from '@lib/utils/quest'
import { NavLink, useNavigation } from '@remix-run/react'
import { useReward } from 'react-rewards'

interface QuestSuccessModalProps {
  routeId: QuestRouteIdType
  quest: GetQuestResponse
  userQuest: GetUserQuestByIdResponse
  isOpen: boolean
  onClose: () => void
}

export default function QuestSuccessModal({
  routeId,
  quest,
  userQuest,
  isOpen,
  onClose,
}: QuestSuccessModalProps) {
  const [rewardReady, setRewardReady] = useState(false)
  const { state } = useNavigation()
  const [nextQuestId, setNextQuestId] = useState<string | null>(null)

  const { reward } = useReward('rewardId', 'confetti', {
    lifetime: 1000,
    elementCount: 100,
    startVelocity: 25,
    zIndex: 1000,
    spread: 100,
    colors: ['#34C578'],
    position: 'absolute',
    onAnimationComplete: () => {
      setHasRewardAnimated(true)
    },
  })
  const [hasRewardAnimated, setHasRewardAnimated] = useState(false)

  useEffect(() => {
    if (isOpen && !hasRewardAnimated && rewardReady) {
      const timer = setTimeout(() => {
        reward()
        setHasRewardAnimated(true)
      }, 500)

      return () => clearTimeout(timer)
    }

    if (!isOpen) {
      setHasRewardAnimated(false)
    }
  }, [isOpen, hasRewardAnimated, rewardReady, reward])

  useEffect(() => {
    if (
      userQuest.status === QuestStatus.COMPLETED ||
      userQuest.status === QuestStatus.CLAIMABLE
    ) {
      setNextQuestId(getQuestId(getNextQuestRouteId(routeId) ?? ''))
    }
  }, [userQuest, quest, routeId])

  return (
    <Dialog defaultOpen open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-[476px] gap-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="justify-between">
            <div className="flex-col justify-center items-start gap-1 inline-flex"></div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center w-full gap-5 p-5 relative overflow-visible">
          <span
            id="rewardId"
            className="absolute top-[10%] left-[50%] -translate-x-[50%] w-5 h-5 z-10"
            ref={(el) => {
              if (el && !rewardReady) {
                setRewardReady(true)
              }
            }}
          />

          <div className="absolute top-0 left-0 w-full h-auto pointer-events-none">
            <svg
              width="476"
              height="584"
              viewBox="0 0 476 584"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                `overflow-visible blur-[75px] fill-success text-success rotate-270`,
              )}
            >
              <g filter="url(#filter0_f_12560_22577)">
                <path
                  d="M187.669 392.149L45.4631 356.99C45.2751 356.944 45.1798 356.734 45.2684 356.562L69.9722 308.554C69.9905 308.518 70.0015 308.479 70.0045 308.439L87.4805 77.7579C87.4917 77.6097 87.6097 77.492 87.7579 77.4813L225.22 67.5203C225.378 67.5089 225.517 67.6215 225.539 67.7778L247.48 224.283C247.492 224.369 247.541 224.446 247.614 224.493L358.18 296.425C358.225 296.454 358.261 296.495 358.285 296.543L413.477 407.954C413.492 407.984 413.502 408.017 413.506 408.051L428.943 538.518C428.969 538.739 428.753 538.911 428.543 538.835L358.353 513.537C358.286 513.513 358.229 513.466 358.194 513.404L315.055 438.096C315.019 438.034 314.963 437.987 314.896 437.963L187.669 392.149Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
              </g>
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Text
              variant={TextVariant.body}
              weight={TextWeight.normal}
              className="text-foreground/50"
            >
              Quest Complete
            </Text>
            <Text variant={TextVariant.headline} weight={TextWeight.medium}>
              {quest.position ? `Chapter ${quest.position} : ` : ''}
              {quest.title}
            </Text>
          </div>
          <div className="relative h-full overflow-hidden rounded-lg shadow-xl theme-border">
            <img
              src={quest.image}
              alt={quest.id}
              className="w-full h-full max-h-[250px] object-cover aspect-square"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
            {/* Center status indicator */}
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <QuestStatusIndicator
                status={QuestStatus.COMPLETED}
                className="scale-125"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Text
              variant={TextVariant.headline}
              weight={TextWeight.medium}
              className="text-success"
            >
              +{quest.points}
            </Text>
            <Text
              variant={TextVariant.body}
              weight={TextWeight.normal}
              className="text-foreground/70"
            >
              IQ Points
            </Text>
          </div>
          <NavLink
            to={`/app/quest/narrative/0${nextQuestId ? `#${nextQuestId}` : ''}`}
          >
            <Button
              variant={ButtonVariant.primary}
              size={ButtonSize.md}
              className="w-48"
              disabled={state !== 'idle'}
            >
              {state !== 'idle'
                ? 'Loading...'
                : nextQuestId
                  ? 'Next Quest'
                  : 'Continue'}
            </Button>
          </NavLink>
        </div>
      </DialogContent>
    </Dialog>
  )
}
