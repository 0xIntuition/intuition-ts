export type StakeTransactionState = {
  status: StakeTransactionStatus
  txHash?: `0x${string}`
  error?: string
}

export type StakeTransactionStatus =
  | 'idle'
  | 'review'
  | 'confirm'
  | 'pending'
  | 'confirmed'
  | 'complete'
  | 'hash'
  | 'error'

export type StakeTransactionAction =
  | { type: 'START_TRANSACTION' }
  | { type: 'REVIEW_TRANSACTION' }
  | { type: 'CONFIRM_TRANSACTION' }
  | { type: 'TRANSACTION_PENDING' }
  | { type: 'TRANSACTION_CONFIRMED' }
  | { type: 'TRANSACTION_COMPLETE'; txHash?: `0x${string}` }
  | { type: 'TRANSACTION_HASH'; txHash?: `0x${string}` }
  | { type: 'TRANSACTION_ERROR'; error: string }

export const stakeTransactionReducer = (
  state: StakeTransactionState,
  action: StakeTransactionAction,
): StakeTransactionState => {
  switch (action.type) {
    case 'START_TRANSACTION':
      return { ...state, status: 'idle' }
    case 'REVIEW_TRANSACTION':
      return { ...state, status: 'review' }
    case 'CONFIRM_TRANSACTION':
      return { ...state, status: 'confirm' }
    case 'TRANSACTION_PENDING':
      return { ...state, status: 'pending' }
    case 'TRANSACTION_CONFIRMED':
      return { ...state, status: 'confirmed' }
    case 'TRANSACTION_COMPLETE':
      return {
        ...state,
        status: 'complete',
        txHash: action.txHash,
      }
    case 'TRANSACTION_HASH':
      return { ...state, status: 'hash', txHash: action.txHash }
    case 'TRANSACTION_ERROR':
      return { ...state, status: 'error', error: action.error }
    default:
      return state
  }
}
