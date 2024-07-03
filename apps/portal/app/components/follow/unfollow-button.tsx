import { useEffect, useState } from 'react'

import { Button, cn } from '@0xintuition/1ui'

import { followModalAtom } from '@lib/state/store'
import { CURRENT_ENV } from '@lib/utils/constants'
import { getChainEnvConfig } from '@lib/utils/environment'
import { Cookie } from '@remix-run/node'
import { useNavigation } from '@remix-run/react'
import { useSetAtom } from 'jotai'
import type {
  StakeTransactionAction,
  StakeTransactionState,
} from 'types/stake-transaction'
import { SessionUser } from 'types/user'
import { formatUnits } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'

interface UnfollowButtonProps {
  user: SessionUser
  tosCookie: Cookie
  val: string
  setVal: (val: string) => void
  setMode: (mode: 'follow' | 'unfollow') => void
  handleAction: () => void
  handleClose?: () => void
  dispatch: (action: StakeTransactionAction) => void
  state: StakeTransactionState
  user_conviction: string
  setValidationErrors: (errors: string[]) => void
  setShowErrors: (show: boolean) => void
  conviction_price: string
  id?: string
  claimOrIdentity?: string
  className?: string
}

const UnfollowButton: React.FC<UnfollowButtonProps> = ({
  val,
  setVal,
  setMode,
  handleAction,
  dispatch,
  state,
  user_conviction,
  setValidationErrors,
  setShowErrors,
  conviction_price,
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
    } else if (state.status === 'review') {
      return 'Confirm'
    } else if (state.status === 'confirm') {
      return 'Continue in Wallet'
    } else if (state.status === 'pending') {
      return 'Pending'
    } else if (state.status === 'confirmed' || state.status === 'complete') {
      return 'Buy More'
    } else if (state.status === 'error') {
      return 'Retry'
    } else if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId) {
      return 'Wrong Network'
    } else {
      return `Follow`
    }
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
      variant="primary"
      onClick={(e) => {
        e.preventDefault()
        setMode('unfollow')
        if (state.status === 'complete' || state.status === 'confirmed') {
          dispatch({ type: 'START_TRANSACTION' })
          setVal('')
        } else if (state.status === 'review') {
          handleAction()
        } else {
          if (chain?.id !== getChainEnvConfig(CURRENT_ENV).chainId) {
            handleSwitch()
          } else if (val !== '') {
            const errors = []
            if (+val * +formattedConvictionPrice > +user_conviction) {
              errors.push('Insufficient funds')
            }

            if (errors.length > 0) {
              setValidationErrors(errors)
              setShowErrors(true)
            } else {
              dispatch({ type: 'REVIEW_TRANSACTION' })
              setValidationErrors([])
            }
          }
        }
      }}
      disabled={
        !address ||
        val === '' ||
        state.status === 'confirm' ||
        state.status === 'pending'
      }
      className={cn(`w-[159px] m-auto mt-10`, className)}
    >
      {getButtonText()}
    </Button>
  )
}

export default UnfollowButton
