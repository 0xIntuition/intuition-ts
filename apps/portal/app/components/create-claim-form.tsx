import { DialogHeader, Text } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'

interface ClaimFormProps {
  onSuccess?: () => void
  onClose: () => void
}

export function ClaimForm({ onSuccess, onClose }: ClaimFormProps) {
  logger(onClose, onSuccess)
  return (
    <>
      <>
        {/* {!isTransactionStarted && ( */}
        <DialogHeader className="py-4">
          <div className="absolute top-5 flex flex-row items-center gap-2 align-baseline text-primary-400">
            <div className="flex flex-col gap-1">
              <Text variant="headline" className="text-foreground-secondary">
                Make a claim about an identity{' '}
              </Text>
              <Text variant="caption" className="text-foreground-secondary">
                Additional text about this.
              </Text>
            </div>
          </div>
        </DialogHeader>
        {/* )} */}
        {/* <CreateIdentityForm
          state={state}
          dispatch={dispatch}
          onClose={onClose}
          setTransactionResponseData={setTransactionResponseData}
          transactionResponseData={transactionResponseData}
        /> */}
      </>
    </>
  )
}
