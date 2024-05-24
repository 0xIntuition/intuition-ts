import { useEffect, useState } from 'react'
import { Wallet } from '@privy-io/server-auth'
import { WalletWithMetadata, usePrivy, useWallets } from '@privy-io/react-auth'
import { useAccount } from 'wagmi'

export interface IPrivySwitchWalletProps {
  activeWallet?: Wallet
  onLinkWalletSuccess?: () => void
}

export default function PrivySwitchWallet({
  activeWallet,
  onLinkWalletSuccess,
}: IPrivySwitchWalletProps) {
  const { ready, authenticated, user: privyUser } = usePrivy()
  const { ready: walletsReady, wallets } = useWallets()
  const [showLinkWallet, setShowLinkWallet] = useState(false)
  const [hasNavigated, setHasNavigated] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    if (
      ready &&
      activeWallet &&
      walletsReady &&
      wallets.length > 0 &&
      privyUser
    ) {
      const linkedWallets = privyUser.linkedAccounts
        .filter((account) => account.type === 'wallet')
        .map((account) => account as WalletWithMetadata)
      const isLinkedWallet = linkedWallets.some(
        (account) => account.address === wallets[0].address,
      )
      if (activeWallet.address !== wallets[0].address && !isLinkedWallet) {
        setShowLinkWallet(true)
      } else {
        setShowLinkWallet(false)
      }
      if (
        activeWallet.address !== wallets[0].address &&
        isLinkedWallet &&
        !hasNavigated
      ) {
        setHasNavigated(true)
        onLinkWalletSuccess?.()
      }
    }
  }, [ready, walletsReady, wallets, activeWallet, privyUser, hasNavigated])

  return (
    <div className="flex items-center gap-4">
      {walletsReady && wallets.length && showLinkWallet && (
        <button
          disabled={!ready || !authenticated}
          onClick={() => {
            wallets[0].loginOrLink()
            setHasNavigated(false)
          }}
        >
          Link wallet
        </button>
      )}
      <div>{address}</div>
    </div>
  )
}
