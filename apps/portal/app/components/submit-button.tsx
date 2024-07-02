import React from 'react'

import { Button } from '@0xintuition/1ui'

import { CURRENT_ENV } from '@lib/utils/constants'
import { getChainEnvConfig } from '@lib/utils/environment'
import { Loader2Icon } from 'lucide-react'
import { baseSepolia, mainnet } from 'viem/chains'
import { useAccount, useSwitchChain } from 'wagmi'

interface SubmitButtonProps {
  loading: boolean
  onClick: () => void
  buttonText: string
  loadingText: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  onClick,
  buttonText,
  loadingText,
}) => {
  const { switchChain } = useSwitchChain()
  const { chain } = useAccount()
  const correctChain =
    chain?.id === (CURRENT_ENV === 'production' ? mainnet.id : baseSepolia.id)

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: getChainEnvConfig(CURRENT_ENV).chainId })
    }
  }
  return (
    <Button
      variant="primary"
      disabled={loading}
      onClick={correctChain ? onClick : handleSwitch}
    >
      {loading ? (
        <>
          <Loader2Icon className="animate-spin h-5 w-5 mr-1" />
          {loadingText}
        </>
      ) : !correctChain ? (
        'Wrong Network'
      ) : (
        buttonText
      )}
    </Button>
  )
}

export default SubmitButton
