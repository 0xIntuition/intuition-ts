import { SunburstNoGlow } from '@components/svg/sunburst-no-glow'
import clsx from 'clsx'

export interface ISunburstCardProps {
  label: string
  disabled?: boolean
  disableScale?: boolean
  size?: 'default' | 'sm' | 'md' | 'x-sm'
  glow?: 'white' | 'blue' | 'purple' | 'yellow' | 'pink'
}

export default function SunburstCard({
  label,
  disabled = false,
  disableScale = false,
  size = 'default',
  glow = 'white',
}: ISunburstCardProps) {
  const glowClasses = {
    white: 'hover:drop-shadow-[0_0_30px_#7ED8FF80]',
    purple: 'hover:drop-shadow-[0_0_30px_#BF7EFF80]',
    yellow: 'hover:drop-shadow-[0_0_30px_#FFDB7E80]',
    blue: 'hover:drop-shadow-[0_0_30px_#55CCFF80]',
    pink: 'hover:drop-shadow-[0_0_30px_#FF88AA80]',
  }

  const sizeClasses = {
    default: '360',
    sm: '250',
    md: '320',
    'x-sm': '240',
  }

  const textSizeClasses = {
    default: 'text-xl',
    sm: 'text-md',
    md: 'text-lg',
    'x-sm': 'text-sm',
  }

  return (
    <div>
      <div
        className={clsx(
          'relative opacity-90 transition-all duration-300 ease-in-out hover:opacity-100 rounded-full',
          !disableScale && 'hover:scale-110',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          glowClasses[glow],
        )}
      >
        <div className="relative">
          <SunburstNoGlow
            className={`transition-all duration-300 ease-in-out backdrop-blur-md rounded-full`}
            width={sizeClasses[size]}
            height={sizeClasses[size]}
          />
        </div>

        <div
          className={clsx(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'text-primary uppercase tracking-[3px] font-medium text-center',
            textSizeClasses[size],
            disabled && 'opacity-40',
          )}
        >
          {label}
        </div>
      </div>
    </div>
  )
}
