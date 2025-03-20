import React, { useState } from 'react'

import { Button, Icon } from '@0xintuition/1ui'

import { useAuth } from '@lib/providers/auth-provider'
import logger from '@lib/utils/logger'
import { Network, Wallet } from 'lucide-react'
import { base, baseSepolia } from 'viem/chains'

import { CURRENT_ENV } from '../consts/general'
import { usePrivyWallet } from '../lib/hooks/usePrivyWallet'

// Helper to parse CAIP-2 chain ID (eip155:1 -> 1)
const parseChainId = (chainId: string | undefined): number | null => {
  if (!chainId) {
    return null
  }
  const match = chainId.match(/^eip155:(\d+)$/)
  return match ? Number(match[1]) : null
}

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
  const { connect, isReady, isAuthenticated, isLoading } = useAuth()
  const [isSwitchingChain, setIsSwitchingChain] = useState(false)
  const targetChainId = CURRENT_ENV === 'development' ? baseSepolia.id : base.id
  const wallet = usePrivyWallet()
  const currentChainId = parseChainId(wallet?.chainId)
  const correctChain = currentChainId === targetChainId

  // Handle chain switching
  const handleSwitch = async () => {
    if (!wallet?.isConnected || isSwitchingChain || !wallet?.isReady) {
      logger('Cannot switch chain:', {
        isConnected: wallet?.isConnected,
        isSwitchingChain,
        isReady: wallet?.isReady,
      })
      return
    }

    try {
      setIsSwitchingChain(true)
      logger('Initiating chain switch:', {
        from: wallet.chainId,
        parsedFrom: currentChainId,
        to: targetChainId,
      })

      const provider = await wallet.getEthereumProvider()
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      })

      logger('Chain switch succeeded')
    } catch (error) {
      logger('Chain switch failed:', error)
    } finally {
      setIsSwitchingChain(false)
    }
  }

  const handleConnect = async () => {
    await connect()
  }

  return (
    <Button
      variant="primary"
      size={size}
      disabled={
        loading ||
        disabled ||
        isLoading ||
        !isReady ||
        isSwitchingChain ||
        !wallet?.isReady
      }
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
      {loading || isSwitchingChain ? (
        <>
          <Icon name="in-progress" className="animate-spin h-4 w-4" />
          {isSwitchingChain ? 'Switching Network...' : loadingText}
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
