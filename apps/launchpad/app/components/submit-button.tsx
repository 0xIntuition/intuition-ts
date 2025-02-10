import React from 'react'

import { Button, Icon } from '@0xintuition/1ui'

import { useAuth } from '@lib/providers/auth-provider'
import { Network, Wallet } from 'lucide-react'
import { base, baseSepolia } from 'viem/chains'
import { useAccount, useSwitchChain } from 'wagmi'

import { CURRENT_ENV } from '../consts/general'
import { getChainEnvConfig } from '../lib/utils/environment'

interface SubmitButtonProps {
  loading: boolean
  onClick: () => void
  buttonText: string
  loadingText: string
  actionText?: string
  className?: string
  disabled?: boolean
  size?: 'lg' | 'md' | 'sm'
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  onClick,
  buttonText,
  loadingText,
  actionText,
  className,
  disabled = false,
  size,
}) => {
  const { switchChain } = useSwitchChain()
  const { chain } = useAccount()
  const { connect, isReady, isAuthenticated, isLoading } = useAuth()
  const correctChain =
    chain?.id === (CURRENT_ENV === 'development' ? baseSepolia.id : base.id)

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: getChainEnvConfig(CURRENT_ENV).chainId })
    }
  }

  const handleConnect = async () => {
    await connect()
  }

  return (
    <Button
      variant="primary"
      size={size}
      disabled={loading || disabled || isLoading || !isReady}
      onClick={(e) => {
        if (!isAuthenticated) {
          handleConnect()
        } else if (!correctChain) {
          e.preventDefault()
          handleSwitch()
        } else {
          onClick()
        }
      }}
      className={className}
    >
      {loading ? (
        <>
          <Icon name="in-progress" className="animate-spin h-4 w-4" />
          {loadingText}
        </>
      ) : !isAuthenticated ? (
        <>
          <Wallet className="h-4 w-4" />
          Connect Wallet {actionText && `to ${actionText}`}
        </>
      ) : !correctChain ? (
        <>
          <Network className="h-4 w-4" />
          Switch Network {actionText && `to ${actionText}`}
        </>
      ) : (
        buttonText
      )}
    </Button>
  )
}

export default SubmitButton
