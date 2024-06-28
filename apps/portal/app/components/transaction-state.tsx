import { useTransactionState } from '@lib/hooks/useTransactionReducer'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

type TransactionStatusProps = {
  reducer: React.Reducer<TransactionStateType, TransactionActionType>
  initialState: TransactionStateType
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  reducer,
  initialState,
}) => {
  const { state } = useTransactionState(reducer, initialState)

  return (
    <div>
      <h3>Transaction Status: {state.status}</h3>
      {state.txHash && <p>Transaction Hash: {state.txHash}</p>}
      {state.error && <p>Error: {state.error}</p>}
    </div>
  )
}

export default TransactionStatus
