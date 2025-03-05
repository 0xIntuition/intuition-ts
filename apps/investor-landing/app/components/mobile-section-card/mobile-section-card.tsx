import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import investorWelcomeCardBg from '@assets/investor-welcome-card-bg.png'
import clsx from 'clsx'

export interface IMobileSectionCardProps {
  text: string
  variant?: 'blue' | 'red'
}

export default function MobileSectionCard({
  text,
  variant = 'blue',
}: IMobileSectionCardProps) {
  return (
    <div className="relative w-full border-t border-b border-border/15 mb-20 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <img
          src={investorWelcomeCardBg}
          alt=""
          className="absolute w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div
        className={clsx(
          'relative z-10 py-5',
          variant === 'blue' && 'bg-success/5',
          variant === 'red' && 'bg-destructive/5',
        )}
      >
        <Text
          variant={TextVariant.heading5}
          weight={TextWeight.medium}
          className="text-primary tracking-wider uppercase"
        >
          {text}
        </Text>
      </div>
    </div>
  )
}
