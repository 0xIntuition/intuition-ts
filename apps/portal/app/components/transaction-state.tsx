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
}: TransactionStatusProps<S, A, TStatus>) => {
  const getStatusMessage = () => {
    if (isTransactionAwaiting(state.status)) return 'Awaiting'
    if (isTransactionProgress(state.status)) return 'Progress'
    if (state.status === 'complete') return 'Transaction Success'
    if (state.status === 'error') return 'Transaction Error'
    return 'Unknown'
  }

  return (
    <div className="flex flex-col items-center">
      <pre>{getStatusMessage()}</pre>
      <pre>
        {statusMessages[state.status as unknown as string] || 'Unknown Status'}
      </pre>
      <pre>{state.status === 'error' && state.error}</pre>
    </div>
  )
}

export default TransactionStatus
