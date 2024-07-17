import React from 'react'

import { ProgressBar } from 'components/ProgressBar'
import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'

export interface ProgressCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  numberTotal: number
  numberCompleted: number
}

const ProgressCard = ({
  numberTotal,
  numberCompleted,
  ...props
}: ProgressCardProps) => {
  const progressPercentage =
    numberTotal > 0 ? (numberCompleted / numberTotal) * 100 : 0

  return (
    <div
      className="relative p-5 w-full theme-border rounded-lg bg-background/60 shadow-md backdrop-blur-lg overflow-hidden"
      {...props}
    >
      <div className="absolute top-0 left-14">
        <ProgressBg className="fill-muted-foreground/70" />
      </div>
      <div className="space-y-8">
        <div className="flex w-full justify-between align-items">
          <Text variant="headline" weight="normal">
            Progress
          </Text>
          <div className="flex gap-1 items-center">
            <Text variant={TextVariant.bodyLarge}>{numberCompleted}</Text>
            <Text
              variant={TextVariant.bodyLarge}
              className="text-muted-foreground"
            >
              /
            </Text>
            <Text
              variant={TextVariant.bodyLarge}
              className="text-muted-foreground"
            >
              {numberTotal}
            </Text>
          </div>
        </div>
        <div className="space-y-2.5">
          <Text variant={TextVariant.body} className="text-muted-foreground">
            {`${progressPercentage}% Complete`}
          </Text>
          <ProgressBar percentage={progressPercentage} />
        </div>
      </div>
    </div>
  )
}

export const ProgressBg = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="458"
      height="110"
      viewBox="0 0 458 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        `overflow-visible blur-[75px] fill-muted-foreground/70`,
        className,
      )}
      {...props}
    >
      <g>
        <path
          d="M322.494 41.6458L278.681 4.9424C278.665 4.92897 278.65 4.91391 278.637 4.89746L274.89 0.114968C274.833 0.0423948 274.746 0 274.654 0H0.3C0.134315 0 0 0.134312 0 0.299998V49.5968C0 49.7551 0.123012 49.8862 0.281004 49.8962L113.74 57.0953C113.764 57.0968 113.789 57.1014 113.812 57.1088L203.399 85.6306C203.432 85.6411 203.466 85.6458 203.5 85.6446L289.221 82.6945C289.249 82.6936 289.277 82.6965 289.304 82.7034L421.738 115.974C421.805 115.991 421.876 115.984 421.939 115.954L457.393 99.2227C457.628 99.1121 457.621 98.7761 457.382 98.6751L322.57 41.6922C322.542 41.6806 322.517 41.665 322.494 41.6458Z"
          className="currentColor"
        />
      </g>
    </svg>
  )
}

export { ProgressCard }
