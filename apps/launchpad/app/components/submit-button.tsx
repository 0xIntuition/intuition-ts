import React from 'react'

import { Button, Icon } from '@0xintuition/1ui'

import { Network } from 'lucide-react'
import { base, baseSepolia } from 'viem/chains'
import { useAccount, useSwitchChain } from 'wagmi'

import { CURRENT_ENV } from '../consts/general'
import { getChainEnvConfig } from '../lib/utils/environment'

interface SubmitButtonProps {
  loading: boolean
  onClick: () => void
  buttonText: string
  loadingText: string
  className?: string
  disabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  onClick,
  buttonText,
  loadingText,
  className,
  disabled = false,
}) => {
  const { switchChain } = useSwitchChain()
  const { chain } = useAccount()
  const correctChain =
    chain?.id === (CURRENT_ENV === 'development' ? baseSepolia.id : base.id)

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: getChainEnvConfig(CURRENT_ENV).chainId })
    }
  }

  return (
    <Button
      variant="primary"
      disabled={loading || disabled}
      onClick={correctChain ? onClick : handleSwitch}
      className={className}
    >
      {loading ? (
        <>
          <Icon name="in-progress" className="animate-spin h-4 w-4" />
          {loadingText}
        </>
      ) : !correctChain ? (
        <>
          <Network className="h-4 w-4" />
          Switch Network
        </>
      ) : (
        buttonText
      )}
    </Button>
  )
}

export default SubmitButton
