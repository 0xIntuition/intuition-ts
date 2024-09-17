import { title } from 'process'

import { Button, Icon, IconName, TextVariant } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

const DEFAULT_SHARE_CTA =
  'Share this content with your network using a direct link or QR code.'

export default function ShareCta() {
  return (
    <div className="flex flex-col w-full justify-between rounded-lg border p-3 items-center gap-3 p-5">
      <div className="flex gap-2 items-center">
        <Icon name={iconName} className="w-5 h-5 shrink-0" />
        <Text variant={TextVariant.body} className="text-inherit">
          {title}
        </Text>
      </div>
      {children}
      {to && (
        <Link to={to} className="w-full">
          <Button variant={buttonVariant} className="w-full">
            View in App
            <Icon name={IconName.squareArrowTopRight} className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}
