import { Button } from '@0xintuition/1ui'

import { getChainEnvConfig } from '@lib/utils/environment'
import { CURRENT_ENV } from 'consts'
import { useSwitchChain } from 'wagmi'

const WrongNetworkButton: React.FC = () => {
  const { switchChain } = useSwitchChain()

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: getChainEnvConfig(CURRENT_ENV).chainId })
    }
  }

  return (
    <Button
      variant="primary"
      type="button"
      onClick={(e) => {
        e.preventDefault
        handleSwitch()
      }}
      className="w-40 mx-auto"
      size="lg"
    >
      Wrong Network
    </Button>
  )
}

export default WrongNetworkButton
