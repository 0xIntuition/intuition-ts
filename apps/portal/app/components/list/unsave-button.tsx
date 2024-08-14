import { useEffect, useState } from 'react'

import { Button, cn } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { saveListModalAtom } from '@lib/state/store'
import { getChainEnvConfig } from '@lib/utils/environment'
import { useNavigate, useNavigation } from '@remix-run/react'
import { CURRENT_ENV, PATHS } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'
import { useSetAtom } from 'jotai'
import { useAccount, useSwitchChain } from 'wagmi'

interface UnsaveButtonProps {
  setMode: (mode: 'save' | 'unsave') => void
  handleAction: () => void
  handleClose: () => void
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  identity: IdentityPresenter
  user_conviction: string
  className?: string
}

const UnsaveButton: React.FC<UnsaveButtonProps> = ({
  setMode,
  handleAction,
  handleClose,
  dispatch,
  state,
  identity,
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
      return 'Go to Identity'
    } else if (state.status === 'error') {
      return 'Retry'
    } else if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId) {
      return 'Wrong Network'
    }
    return `Unsave`
  }

  const setSaveListModalActive = useSetAtom(saveListModalAtom)

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
      setSaveListModalActive({
        isOpen: false,
        id: null,
        tag: null,
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
          navigate(
            identity.is_user
              ? `${PATHS.PROFILE}/${identity.identity_id}`
              : `${PATHS.IDENTITY}/${identity.id}`,
          )
        } else if (state.status === 'review-transaction') {
          handleAction()
        } else if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId) {
          handleSwitch()
        } else if (user_conviction !== '') {
          setMode('unsave')
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

export default UnsaveButton
