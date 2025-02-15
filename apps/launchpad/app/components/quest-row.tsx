import { Button, Card, cn, Text } from '@0xintuition/1ui'

import { toRomanNumeral } from '@lib/utils/misc'
import { Link } from '@remix-run/react'

interface QuestRowProps {
  title: string
  description: string
  link: string
  enabled?: boolean
  index: number
}

export function QuestRow({
  title,
  description,
  link,
  enabled = true,
  index,
}: QuestRowProps) {
  const BaseRow = (
    <Card
      className={cn(
        'h-32 rounded-lg w-full relative bg-black/5 backdrop-blur-md backdrop-saturate-150 p-6 border border-border/10',
      )}
    >
      <div className={cn('absolute inset-0 p-8', !enabled && 'blur-sm')}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-6">
            <div className="flex border theme-border rounded-xl h-16 w-16 items-center justify-center font-serif text-2xl pointer-events-none">
              {toRomanNumeral(index)}
            </div>
            <div className="space-y-2">
              <Text
                variant="headline"
                weight="medium"
                className="text-foreground"
              >
                {title}
              </Text>
              <Text
                variant="body"
                weight="medium"
                className="text-foreground/70"
              >
                {description}
              </Text>
            </div>
          </div>
          {enabled && (
            <Link to={link}>
              <Button variant="primary" size="lg" className="w-32 h-fit">
                Start
              </Button>
            </Link>
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
            <span className="text-xl font-semibold text-foreground">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    )
  }

  return BaseRow
}
