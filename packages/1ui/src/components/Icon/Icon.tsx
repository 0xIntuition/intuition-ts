import * as React from 'react'

import { cn } from '@styles'
import { IconName } from './Icon.types'

// eslint-disable-next-line
// @ts-ignore
import spriteSheet from './Icon.sprites.svg'

export interface IconProps {
  name: IconName
  className?: string
}

const Icon = ({ name, className }: IconProps) => {
  return (
    <svg className={cn(`h-6 w-6`, className)}>
      <use href={`${spriteSheet}#${name}`} />
    </svg>
  )
}

export { Icon }
