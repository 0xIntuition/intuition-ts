import * as React from 'react'

import { cn } from '../../styles'
// eslint-disable-next-line
// @ts-ignore
import spriteSheet from './Icon.sprites.svg'
import { IconNameType } from './Icon.types'

export interface IconProps {
  name: IconNameType
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
