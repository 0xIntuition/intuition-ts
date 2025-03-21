import {
  Avatar,
  Button,
  ButtonVariant,
  Card,
  cn,
  IconName,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import SubmitButton from '@components/submit-button'
import { truncateString } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { CheckCircle } from 'lucide-react'

interface QuestionRowProps {
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

export function QuestionRow({
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
}: QuestionRowProps) {
  return (
    <Card
      className={cn(
        'relative h-24 rounded-lg border-none overflow-hidden flex items-center',
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(6, 5, 4, 0.9), rgba(16, 16, 16, 0.9)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center justify-between w-full px-6">
        <div className="flex items-center gap-6">
          <div className="space-y-1 flex-1">
            <Text
              variant="headline"
              weight="medium"
              className="text-foreground text-base"
            >
              {title}
            </Text>
            <Text
              variant="body"
              weight="medium"
              className="text-foreground/70 text-sm"
            >
              {description}
            </Text>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-row gap-2">
            {completedAtom && (
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => onCompletedAtomClick?.(completedAtom.id)}
                  className="flex items-center gap-2 rounded-lg transition-colors bg-background/50 backdrop-blur-md backdrop-saturate-150 border border-border/10 p-1"
                >
                  <Avatar
                    src={completedAtom.image ?? ''}
                    name={completedAtom.label}
                    icon={IconName.fingerprint}
                    className="w-6 h-6 object-cover rounded"
                  />
                  <Text variant={TextVariant.body} className="text-sm">
                    {truncateString(completedAtom.label, 15)}
                  </Text>
                  <CheckCircle className="text-success h-4 w-4" />
                </button>
              </div>
            )}
            {points > 0 ? (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent">
                  {points}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  IQ Earned
                </span>
              </div>
            ) : isActive ? (
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Earn
                </span>
                <span className="text-lg font-bold bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent">
                  {pointAwardAmount}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  IQ
                </span>
              </div>
            ) : null}
          </div>

          <div className="flex gap-2">
            {points <= 0 && isActive && (
              <SubmitButton
                onClick={onStart}
                disabled={isLoading}
                buttonText="Answer"
                loading={isLoading}
                loadingText="Loading..."
                actionText="Answer"
              />
            )}
            {resultsLink && (
              <Link to={resultsLink}>
                <Button
                  variant={ButtonVariant.secondary}
                  className="!bg-background primary-gradient-subtle"
                >
                  View Results
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
