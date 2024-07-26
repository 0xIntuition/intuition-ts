import { useEffect, useState } from 'react'

import { Button } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { createClaimModalAtom } from '@lib/state/store'
import { getChainEnvConfig } from '@lib/utils/environment'
import { useNavigate, useNavigation } from '@remix-run/react'
import { CURRENT_ENV } from 'consts'
import { TRANSACTION_STATUS } from 'consts/transaction'
import { useSetAtom } from 'jotai'
import {
  TransactionActionType,
  TransactionStateType,
  TransactionStatusType,
} from 'types/transaction'
import { Chain } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'

interface CreateClaimButtonProps {
  handleAction: () => void
  handleClose: () => void
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  claim_id: string
  selectedIdentities: {
    subject: IdentityPresenter | null
    predicate: IdentityPresenter | null
    object: IdentityPresenter | null
  }
  claimExists: boolean
}

const useNavigationEffect = (
  setCreateClaimModalActive: (value: {
    isOpen: boolean
    id: string | null
  }) => void,
) => {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const [navigationStarted, setNavigationStarted] = useState(false)

  useEffect(() => {
    if (navigation.state !== 'idle') {
      setNavigationStarted(true)
    }
  }, [navigation.state])

  useEffect(() => {
    if (navigation.state === 'idle' && navigationStarted) {
      setCreateClaimModalActive({ isOpen: false, id: null })
      setNavigationStarted(false)
    }
  }, [navigation.state, navigationStarted, setCreateClaimModalActive])

  return navigate
}

const getButtonText = (
  state: { status: TransactionStatusType },
  chain: Chain | undefined,
  claimExists: boolean,
): string => {
  switch (state.status) {
    case TRANSACTION_STATUS.REVIEW_TRANSACTION:
      return 'Create Claim'
    case TRANSACTION_STATUS.AWAITING:
      return 'Continue in Wallet'
    case TRANSACTION_STATUS.TRANSACTION_PENDING:
      return 'Pending'
    case TRANSACTION_STATUS.TRANSACTION_CONFIRMED:
    case TRANSACTION_STATUS.COMPLETE:
      return 'View Claim'
    case TRANSACTION_STATUS.ERROR:
      return 'Retry'
    default:
      if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId) {
        return 'Wrong Network'
      }
      if (claimExists) {
        return 'Claim Exists'
      }
      return 'Review'
  }
}

const CreateClaimButton: React.FC<CreateClaimButtonProps> = ({
  handleAction,
  handleClose,
  dispatch,
  state,
  claim_id,
  selectedIdentities,
  claimExists,
}) => {
  const { switchChain } = useSwitchChain()
  const { address, chain } = useAccount()
  const setCreateClaimModalActive = useSetAtom(createClaimModalAtom)
  const navigate = useNavigationEffect((value) =>
    setCreateClaimModalActive(value.isOpen),
  )

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (
      state.status === 'complete' ||
      state.status === 'transaction-confirmed'
    ) {
      navigate(`/app/claim/${claim_id}`)
      handleClose()
      dispatch({ type: 'START_TRANSACTION' })
    } else if (state.status === 'review-transaction') {
      handleAction()
    } else if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId) {
      switchChain?.({ chainId: getChainEnvConfig(CURRENT_ENV).chainId })
    } else if (state.status === 'idle' || state.status === 'error') {
      dispatch({ type: 'REVIEW_TRANSACTION' })
    } else {
      handleAction()
    }
  }

  const isDisabled =
    !address ||
    (claimExists && state.status !== 'complete') ||
    selectedIdentities.subject === null ||
    selectedIdentities.predicate === null ||
    selectedIdentities.object === null ||
    ['confirm', 'transaction-pending', 'awaiting'].includes(state.status)

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      disabled={isDisabled}
      className="w-40"
    >
      {getButtonText(state, chain, claimExists)}
    </Button>
  )
}

export default CreateClaimButton
