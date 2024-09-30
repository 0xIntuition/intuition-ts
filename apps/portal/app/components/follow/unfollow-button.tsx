import { useEffect, useState } from 'react'

import { Button, cn } from '@0xintuition/1ui'

import { followModalAtom } from '@lib/state/store'
import { getChainEnvConfig } from '@lib/utils/environment'
import { useNavigation } from '@remix-run/react'
import { CURRENT_ENV } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'
import { useSetAtom } from 'jotai'
import { useAccount, useSwitchChain } from 'wagmi'

interface UnfollowButtonProps {
  setMode: (mode: 'follow' | 'unfollow') => void
  handleAction: () => void
  handleClose: () => void
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  user_conviction: string
  className?: string
}

const UnfollowButton: React.FC<UnfollowButtonProps> = ({
  setMode,
  handleAction,
  handleClose,
  dispatch,
  state,
  user_conviction,
  className,
}) => {
  const { switchChain } = useSwitchChain()

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: getChainEnvConfig(CURRENT_ENV).chainId })
    }
  }

  const { address, chain } = useAccount()

  const getButtonText = () => {
    if (state.status === 'review-transaction') {
      return 'Confirm'
    } else if (state.status === 'awaiting') {
      return 'Continue in Wallet'
    } else if (state.status === 'transaction-pending') {
      return 'Pending'
    } else if (
      state.status === 'transaction-confirmed' ||
      state.status === 'complete'
    ) {
      return 'Go to Profile'
    } else if (state.status === 'error') {
      return 'Retry'
    } else if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId) {
      return 'Switch Network'
    }
    return `Unfollow`
  }

  const setFollwoModalActive = useSetAtom(followModalAtom)

  const navigation = useNavigation()
  const [navigationStarted, setNavigationStarted] = useState(false)

  useEffect(() => {
    if (navigation.state !== 'idle') {
      setNavigationStarted(true)
    }
  }, [navigation.state])

  useEffect(() => {
    if (navigation.state === 'idle' && navigationStarted) {
      setFollwoModalActive({
        isOpen: false,
        id: null,
      })
      setNavigationStarted(false)
    }
  }, [navigation.state, navigationStarted])

  return (
    <Button
      variant={`${state.status === 'idle' ? 'destructiveOutline' : 'primary'}`}
      onClick={(e) => {
        e.preventDefault()
        if (
          state.status === 'complete' ||
          state.status === 'transaction-confirmed'
        ) {
          handleClose()
        } else if (state.status === 'review-transaction') {
          handleAction()
        } else if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId) {
          handleSwitch()
        } else if (user_conviction !== '') {
          setMode('unfollow')
          dispatch({ type: 'REVIEW_TRANSACTION' })
        }
      }}
      disabled={
        !address ||
        state.status === 'confirm' ||
        state.status === 'transaction-pending' ||
        state.status === 'awaiting'
      }
      className={cn(`w-40`, className)}
    >
      {getButtonText()}
    </Button>
  )
}

export default UnfollowButton
