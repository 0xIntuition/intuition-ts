import {
  Avatar,
  Button,
  Card,
  cn,
  IconName,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import SubmitButton from '@components/submit-button'
import { truncateString } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { CheckCircle } from 'lucide-react'

interface QuestionCardProps {
  className?: string
  onStart: () => void
  title: string
  description: string
  image: string
  points: number
  pointAwardAmount: number
  isActive: boolean
  isLoading?: boolean
  resultsLink?: string
  completedAtom?: {
    id: number
    label: string
    image?: string
    vault_id: string
  }
  onCompletedAtomClick?: (id: number) => void
}

export function QuestionCard({
  className,
  onStart,
  title,
  description,
  image,
  points,
  pointAwardAmount,
  isActive,
  isLoading = false,
  resultsLink,
  completedAtom,
  onCompletedAtomClick,
}: QuestionCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className={`relative h-[400px] rounded-lg border-none w-full md:min-w-[480px] overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(6, 5, 4, 0.9), rgba(16, 16, 16, 0.9)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="space-y-2">
          <Text variant="headline" weight="medium" className="text-foreground">
            {title}
          </Text>
          <Text variant="body" weight="medium" className="text-foreground/70">
            {description}
          </Text>
        </div>

        <div className="flex flex-col gap-4 items-center justify-between">
          {points <= 0 && isActive && (
            <SubmitButton
              onClick={() => onStart()}
              className="min-w-[200px]"
              size="lg"
              disabled={isLoading}
              buttonText={'Answer Question'}
              loading={isLoading}
              loadingText="Loading..."
              actionText="Answer"
            />
          )}
          <Button
            onClick={() => navigate(resultsLink || '')}
            variant="secondary"
            size="lg"
            className="min-w-[200px] rounded-full !bg-background"
            disabled={isLoading}
          >
            See Results
          </Button>
        </div>

        <div
          className={cn(
            `flex md:items-end flex-col md:flex-row gap-2 md:gap-0`,
            completedAtom ? 'justify-between' : 'justify-end',
          )}
        >
          {completedAtom && (
            <div className="flex flex-col gap-1 items-center md:items-start">
              <Text
                variant="body"
                weight="medium"
                className="text-foreground/70 ml-1"
              >
                You selected:
              </Text>
              <button
                onClick={() => onCompletedAtomClick?.(completedAtom.id)}
                className="flex items-center gap-4 rounded-lg transition-colors md:w-[250px] h-[52px] bg-background/50 backdrop-blur-md backdrop-saturate-150 border border-border/10"
              >
                <div className="w-10 h-10 rounded bg-[#1A1A1A] flex-shrink-0 ml-1">
                  <Avatar
                    src={completedAtom.image ?? ''}
                    name={completedAtom.label}
                    icon={IconName.fingerprint}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-left w-full">
                  <div className="text-white text-sm leading-5 w-full">
                    <Text variant={TextVariant.body}>
                      {truncateString(completedAtom.label, 20)}
                    </Text>
                  </div>
                </div>
                <div className="flex justify-end pr-4">
                  <CheckCircle className="text-success h-4 w-4" />
                </div>
              </button>
            </div>
          )}
          {points > 0 ? (
            <div className="flex items-baseline gap-2 justify-center md:justify-start">
              <span className="text-xl font-bold bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent">
                {points}
              </span>
              <span className="text-md font-semibold text-muted-foreground">
                IQ Earned
              </span>
            </div>
          ) : isActive ? (
            <div className="flex items-baseline gap-2 justify-center md:justify-start">
              <span className="text-md font-semibold text-muted-foreground">
                Earn
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent">
                {pointAwardAmount}
              </span>
              <span className="text-md font-semibold text-muted-foreground">
                IQ Points
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
