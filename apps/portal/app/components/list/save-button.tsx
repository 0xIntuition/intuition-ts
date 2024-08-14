import { useEffect, useState } from 'react'

import { Button, cn } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { saveListModalAtom } from '@lib/state/store'
import { getChainEnvConfig } from '@lib/utils/environment'
import { formatBalance } from '@lib/utils/misc'
import { useNavigate, useNavigation } from '@remix-run/react'
import { CURRENT_ENV, PATHS } from 'app/consts'
import {
  TransactionActionType,
  TransactionStateType,
} from 'app/types/transaction'
import { useSetAtom } from 'jotai'
import { formatUnits } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'

interface SaveButtonProps {
  val: string
  setMode: (mode: 'save' | 'unsave') => void
  handleAction: () => void
  handleClose: () => void
  dispatch: (action: TransactionActionType) => void
  state: TransactionStateType
  identity: IdentityPresenter
  min_deposit: string
  walletBalance: string
  conviction_price: string
  user_assets: string
  setValidationErrors: (errors: string[]) => void
  setShowErrors: (show: boolean) => void
  className?: string
}

const SaveButton: React.FC<SaveButtonProps> = ({
  val,
  setMode,
  handleAction,
  handleClose,
  dispatch,
  state,
  identity,
  min_deposit,
  walletBalance,
  conviction_price,
  user_assets,
  setValidationErrors,
  setShowErrors,
  className,
}) => {
  const { switchChain } = useSwitchChain()

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: getChainEnvConfig(CURRENT_ENV).chainId })
    }
  }

  const { address, chain } = useAccount()

  const formattedConvictionPrice = formatUnits(BigInt(conviction_price), 18)

  const getButtonText = () => {
    if (val === '') {
      return 'Enter an Amount'
    } else if (state.status === 'review-transaction') {
      return 'Confirm'
    } else if (state.status === 'awaiting') {
      return 'Continue in Wallet'
    } else if (state.status === 'transaction-pending') {
      return 'Pending'
    } else if (
      state.status === 'transaction-confirmed' ||
      state.status === 'complete'
    ) {
      return 'Go to Tag'
    } else if (state.status === 'error') {
      return 'Retry'
    } else if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId) {
      return 'Wrong Network'
    }
    return `${user_assets > '0' ? 'Increase Stake' : 'Save'}`
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
      variant="primary"
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
        } else if (val !== '') {
          const errors = []
          if (+val < +formatUnits(BigInt(min_deposit), 18)) {
            errors.push(
              `Minimum deposit is ${formatBalance(min_deposit, 18, 4)} ETH`,
            )
          }
          if (+val * +formattedConvictionPrice > +walletBalance) {
            errors.push('Insufficient funds')
          }

          if (errors.length > 0) {
            setValidationErrors(errors)
            setShowErrors(true)
          } else {
            setMode('save')
            dispatch({ type: 'REVIEW_TRANSACTION' })
            setValidationErrors([])
          }
        }
      }}
      disabled={
        !address ||
        val === '' ||
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

export default SaveButton
