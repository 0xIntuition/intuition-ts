import {
  Button,
  Icon,
  Identity,
  IdentityTag,
  IdentityTagSize,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

interface AddListAlertCtaProps {
  message: string
  identity: IdentityPresenter
  onSaveClick: () => void
  onClose: () => void
}

export function AddListAlertCta({
  message,
  identity,
  onSaveClick,
  onClose,
}: AddListAlertCtaProps) {
  return (
    <div
      className="flex items-center justify-between  border border-warning/30 px-4 py-3 rounded  w-full"
      role="alert"
    >
      <div className="flex flex-col space-x-2 w-full">
        <div className="flex items-center gap-2">
          <Icon name="triangle-exclamation" className="text-warning" />
          <Text variant="caption" weight="regular" className="text-warning">
            {message}
          </Text>
        </div>
        <div className="flex flex-row items-center justify-between">
          <IdentityTag
            size={IdentityTagSize.md}
            variant={Identity.nonUser}
            imgSrc={identity.image ?? ''}
          >
            <Trunctacular value={identity.display_name} />
          </IdentityTag>
          <div className="flex items-center space-x-2">
            <Button
              onClick={onSaveClick}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded text-sm"
            >
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
