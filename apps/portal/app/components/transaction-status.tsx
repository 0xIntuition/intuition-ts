import { Button } from '@0xintuition/1ui'

import { BLOCK_EXPLORER_URL } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { Link, useNavigate } from '@remix-run/react'
import { ExternalLinkIcon } from 'lucide-react'
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
    <div className="flex flex-col items-center justify-center min-h-96">
      <pre>{getStatusMessage()}</pre>
      <pre>
        {statusMessages[state.status as unknown as string] || 'Unknown Status'}
      </pre>
      <pre>{state.status === 'error' && state.error}</pre>
      {state.status === 'complete' && transactionDetail !== undefined && (
        <div className="flex flex-col gap-1 items-center gap-2.5">
          {state.txHash && (
            <Link
              to={`${BLOCK_EXPLORER_URL}/tx/${state.txHash}`}
              target="_blank"
              className="flex flex-row items-center gap-1 text-xxs text-blue-500 transition-colors duration-300 hover:text-blue-400"
            >
              View on Basescan <ExternalLinkIcon className="h-2.5 w-2.5" />
            </Link>
          )}
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              navigate(`/app/identity/${transactionDetail}`)
            }}
          >
            View identity
          </Button>
        </div>
      )}
    </div>
  )
}

export default TransactionStatus
