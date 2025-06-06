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
        'rounded-lg w-full relative bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10',
      )}
    >
      <div className={cn('w-full p-4 lg:p-6', !enabled && 'blur-sm')}>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-6">
          <div className="flex flex-row gap-3 lg:gap-4 flex-1">
            <div className="flex border theme-border rounded-xl h-12 w-12 lg:h-14 lg:w-14 items-center justify-center font-serif text-lg lg:text-xl pointer-events-none shrink-0">
              {toRomanNumeral(index)}
            </div>
            <div className="space-y-1 lg:space-y-2 flex-1 min-w-0">
              <Text
                variant="headline"
                weight="medium"
                className="text-foreground text-base lg:text-xl leading-tight"
              >
                {title}
              </Text>
              <Text
                variant="body"
                weight="medium"
                className="text-foreground/70 text-sm lg:text-base leading-relaxed"
              >
                {description}
              </Text>
            </div>
          </div>
          {enabled && (
            <div className="flex flex-col-reverse lg:flex-col items-start lg:items-end gap-3 lg:gap-2 shrink-0">
              {iqPoints && (
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <Text
                    variant={TextVariant.body}
                    weight={TextWeight.medium}
                    className="text-muted-foreground text-xs lg:text-sm"
                  >
                    Earn up to
                  </Text>
                  <Text
                    variant={TextVariant.bodyLarge}
                    weight={TextWeight.bold}
                    className="bg-gradient-to-r from-[#34C578] to-[#00FF94] bg-clip-text text-transparent text-sm lg:text-base"
                  >
                    {iqPoints.toLocaleString()}
                  </Text>
                  <Text
                    variant={TextVariant.body}
                    weight={TextWeight.medium}
                    className="text-muted-foreground text-xs lg:text-sm"
                  >
                    IQ
                  </Text>
                </div>
              )}
              <Link to={link} className="w-full lg:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full lg:w-28 h-10 lg:h-11"
                >
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
          <div className="px-4 py-2 lg:px-6 lg:py-3 rounded-lg">
            <span className="text-base lg:text-xl font-semibold text-foreground">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    )
  }

  return BaseRow
}
