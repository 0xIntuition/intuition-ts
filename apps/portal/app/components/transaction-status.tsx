import { Button } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'
import { useNavigate } from '@remix-run/react'
import { BaseTransactionStateType } from 'types/transaction'

type TransactionStatusProps<
  S extends BaseTransactionStateType<TStatus>,
  A,
  TStatus,
> = {
  state: S
  dispatch: React.Dispatch<A>
  statusMessages: { [key: string]: string }
  isTransactionAwaiting: (status: TStatus) => boolean
  isTransactionProgress: (status: TStatus) => boolean
  transactionDetail?: string | null
}

const TransactionStatus = <
  S extends BaseTransactionStateType<TStatus>,
  A,
  TStatus,
>({
  state,
  statusMessages,
  isTransactionAwaiting,
  isTransactionProgress,
  transactionDetail,
}: TransactionStatusProps<S, A, TStatus>) => {
  const getStatusMessage = () => {
    if (isTransactionAwaiting(state.status)) return 'Awaiting'
    if (isTransactionProgress(state.status)) return 'Progress'
    if (state.status === 'complete') return 'Transaction Success'
    if (state.status === 'error') return 'Transaction Error'
    return 'Unknown'
  }

  logger('transactionDetail', transactionDetail)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center">
      <pre>{getStatusMessage()}</pre>
      <pre>
        {statusMessages[state.status as unknown as string] || 'Unknown Status'}
      </pre>
      <pre>{state.status === 'error' && state.error}</pre>
      {state.status === 'complete' && transactionDetail !== undefined && (
        <Button
          type="button"
          className="mt-16 flex w-56 justify-center gap-4 rounded-full text-primary-950"
          onClick={() => {
            navigate(`/app/identity/${transactionDetail}`)
          }}
        >
          View Identity Details
        </Button>
      )}
    </div>
  )
}

export default TransactionStatus
