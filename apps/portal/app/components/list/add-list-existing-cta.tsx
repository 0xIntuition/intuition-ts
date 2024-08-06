import {
  Button,
  Icon,
  Identity,
  IdentityTag,
  IdentityTagSize,
  TagWithValue,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { truncateString } from '@lib/utils/misc'

interface AddListAlertCtaProps {
  variant: 'identity' | 'tag'
  identity: IdentityPresenter
  onSaveClick: () => void
  onClose: () => void
}

export function AddListExistingCta({
  variant,
  identity,
  onSaveClick,
  onClose,
}: AddListAlertCtaProps) {
  const message =
    variant === 'identity'
      ? 'This identity already exists in this list.'
      : 'This tag already exists in this list.'

  return (
    <div className="flex items-center justify-between bg-warning/10 border border-warning/30 px-4 py-3 rounded w-full mb-5">
      <div className="flex flex-col w-full">
        <div className="flex items-center mb-2 gap-2">
          <Icon name="triangle-exclamation" className="text-warning" />
          <Text variant="caption" weight="regular" className="text-warning">
            {message}
          </Text>
        </div>
        <div className="flex flex-row items-center justify-between">
          {variant === 'identity' ? (
            <IdentityTag
              size={IdentityTagSize.md}
              variant={Identity.nonUser}
              imgSrc={identity.image ?? ''}
            >
              <Trunctacular value={identity.display_name} />
            </IdentityTag>
          ) : (
            <TagWithValue label={truncateString(identity.display_name, 20)} />
          )}
          <div className="flex items-center gap-4">
            <Button onClick={onSaveClick} variant="secondary">
              Save
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="border-none"
            >
              <Icon name="cross-large" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
