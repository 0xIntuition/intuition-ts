import {
  Button,
  Card,
  cn,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { toRomanNumeral } from '@lib/utils/misc'
import { Link } from '@remix-run/react'

interface QuestRowProps {
  title: string
  description: string
  link: string
  enabled?: boolean
  index: number
  iqPoints?: number
}

export function QuestRow({
  title,
  description,
  link,
  enabled = true,
  index,
  iqPoints,
}: QuestRowProps) {
  const BaseRow = (
    <Card
      className={cn(
        'min-h-[8rem] sm:h-32 rounded-lg w-full relative bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10',
      )}
    >
      <div className={cn('h-full w-full p-4 sm:p-8', !enabled && 'blur-sm')}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 h-full">
          <div className="flex flex-row gap-4 sm:gap-6">
            <div className="flex border theme-border rounded-xl h-12 w-12 sm:h-16 sm:w-16 items-center justify-center font-serif text-xl sm:text-2xl pointer-events-none shrink-0">
              {toRomanNumeral(index)}
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Text
                variant="headline"
                weight="medium"
                className="text-foreground text-lg sm:text-xl"
              >
                {title}
              </Text>
              <Text
                variant="body"
                weight="medium"
                className="text-foreground/70 text-sm sm:text-base"
              >
                {description}
              </Text>
            </div>
          </div>
          {enabled && (
            <div className="flex flex-row md:flex-col items-center gap-2 md:items-end justify-between">
              {iqPoints && (
                <div className="flex items-baseline gap-2 order-first">
                  <Text
                    variant={TextVariant.body}
                    weight={TextWeight.medium}
                    className="text-muted-foreground"
                  >
                    Earn up to
                  </Text>
                  <Text
                    variant={TextVariant.bodyLarge}
                    weight={TextWeight.bold}
                    className="bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent"
                  >
                    {iqPoints.toLocaleString()}
                  </Text>
                  <Text
                    variant={TextVariant.body}
                    weight={TextWeight.medium}
                    className="text-muted-foreground"
                  >
                    IQ
                  </Text>
                </div>
              )}
              <Link to={link}>
                <Button variant="primary" size="lg" className="w-32 h-fit">
                  Start
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  )

  if (!enabled) {
    return (
      <div className="relative">
        {BaseRow}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-6 py-3 rounded-lg">
            <span className="text-lg sm:text-xl font-semibold text-foreground">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    )
  }

  return BaseRow
}
