import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  Tags,
  TagWithValue,
  Text,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { TransactionActionType } from 'types/transaction'

interface TagsReviewProps {
  dispatch: (action: TransactionActionType) => void

  tags: IdentityPresenter[]
}

export default function TagsReview({ dispatch, tags }: TagsReviewProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="justify-between">
          <div className="flex flex-row gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault()
                dispatch({ type: 'START_TRANSACTION' })
              }}
              variant="ghost"
              size="icon"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
            </Button>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col justify-center items-center gap-5">
        <Icon name="await-action" className="h-20 w-20 text-neutral-50/30" />
        <div className="gap-5 flex flex-col items-center">
          <Text
            variant="headline"
            weight="medium"
            className="text-secondary-foreground/70"
          >
            Review your Tags
          </Text>
        </div>
        <div className="items-center">
          <Tags>
            <div className="flex flex-wrap gap-2 items-center">
              {tags.map((tag, index) => (
                <TagWithValue
                  key={index}
                  label={tag.display_name}
                  value={tag.num_positions}
                />
              ))}
            </div>
          </Tags>
        </div>
        <Text variant="body" className="text-primary/50">
          Estimated Fees: 0.001 ETH{' '}
          {/* TODO: [ENG-2519] placeholder for actual cost */}
        </Text>
      </div>
      <DialogFooter className="!justify-center !items-center mt-20">
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="primary"
            onClick={() => dispatch({ type: 'CONFIRM_TRANSACTION' })}
          >
            Confirm
          </Button>
        </div>
      </DialogFooter>
    </>
  )
}
