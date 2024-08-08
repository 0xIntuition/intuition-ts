import {
  Button,
  ButtonVariant,
  Icon,
  IconName,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

export interface GenericCalloutProps {
  className?: string
  variant: 'warning' | 'danger'
  text: string
  link: string
}

export function GenericCallout({ variant, text, link }: GenericCalloutProps) {
  return (
    <div
      className={`m-auto my-2 flex flex-row items-center justify-between gap-2 rounded-xl theme-border px-4 py-2 text-primary w-full bg-gradient-to-r ${variant === 'warning' ? 'from-warning/30' : 'from-destructive/30'}`}
    >
      <span className="flex flex-row gap-1 items-center">
        <Icon
          name={IconName.triangleExclamation}
          className={`h-6 w-6 ${variant === 'warning' ? 'text-warning' : 'text-destructive'}`}
        />{' '}
        <Text variant={TextVariant.body}>{text}</Text>
      </span>
      <Link
        to={link}
        target="_blank"
        className="flex flex-row items-center gap-1 font-medium"
      >
        <Button variant={ButtonVariant.secondary}>
          Read more{' '}
          <Icon name={IconName.squareArrowTopRight} className="h-3 w-3" />
        </Button>
      </Link>
    </div>
  )
}
