import { User } from '@privy-io/server-auth'

export function hasSmartWallet(user: User | null): boolean {
  if (!user) {
    return false
  }

  if ('smartWallet' in user && user.smartWallet) {
    return true
  }

  const externalWallet = user.linkedAccounts.find(
    (account) =>
      account.type === 'wallet' && account.connectorType === 'injected',
  )

  return !externalWallet
}
