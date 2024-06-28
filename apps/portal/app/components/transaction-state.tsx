import { BaseTransactionStateType } from 'types/transaction'

type TransactionStatusProps<
  S extends BaseTransactionStateType<TStatus>,
  A,
  TStatus,
> = {
  state: S
  dispatch: React.Dispatch<A>
}

const TransactionStatus = <
  S extends BaseTransactionStateType<TStatus>,
  A,
  TStatus,
>({
  state,
}: TransactionStatusProps<S, A, TStatus>) => {
  return (
    <div>
      <h3>Status: {String(state.status)}</h3>
    </div>
  )
}

export default TransactionStatus
