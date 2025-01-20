import { Button, Card, cn, Text } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

function toRomanNumeral(num: number): string {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ]

  let result = ''
  let remaining = num

  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral
      remaining -= value
    }
  }

  return result
}

interface QuestCardProps {
  title: string
  description: string
  link: string
  enabled?: boolean
  index: number
}

export function QuestCard({
  title,
  description,
  link,
  enabled = true,
  index,
}: QuestCardProps) {
  const BaseCard = (
    <Card
      className={cn(
        'h-32 rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] w-full relative',
        !enabled && 'blur-sm brightness-50',
      )}
    >
      <div className="absolute inset-0 p-8">
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
        {BaseCard}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background/80 px-6 py-3 rounded-lg backdrop-blur-sm">
            <span className="text-xl font-semibold text-foreground">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    )
  }

  return BaseCard
}
